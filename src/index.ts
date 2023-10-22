import { Elysia } from 'elysia';
import './database/db.setup';
import { usersController } from './controllers/users.controller';
import {swagger} from "@elysiajs/swagger";
import {helmet} from "elysia-helmet";
import { basicAuth } from '@eelkevdbos/elysia-basic-auth'
import {kirbysController} from "./controllers/kirbycontroller";
const PORT = process.env.PORT || 3000;
export const app = new Elysia();

process.env["BASIC_AUTH_CREDENTIALS"] = "admin:admin"

app
    .use(
        swagger({
            path: '/swagger',
            documentation: {
                info: {
                    title: 'Bun.js CRUD app with Elysia.js',
                    version: '1.0.0',
                },
                tags: [
                    { name: 'App', description: 'General endpoints' },
                    { name: 'Crud User', description: 'CRUD for users' },
                    { name: 'Crud Kirby', description: 'CRUD for Kirby' }
                ]
            },
        }))
    .use(basicAuth())
    .get("/", () => "private")
    // access to realm within a handler
    .get('/private/realm-stored', ({ store }) => store.basicAuthRealm)
    .get('/', () =>  Bun.file("./src/index.html"), {
        detail: {
            summary: 'Index',
            tags: ['App'],
            description: "Can add, update or delete a user via CTA buttons",
            responses: {
                "200": {
                    description: "Add, update or delete a user in database",
                }
            }
        }
    })
    .get("/script.js", () => Bun.file("./src/script.js"))
    .use(usersController)
    .use(kirbysController)
    .use(
        basicAuth({
            users: [{ username: 'admin', password: 'admin' }],
            realm: '',
            errorMessage: 'Unauthorized',
            exclude: ['public/**'],
            noErrorThrown: false,
        })
    )
    .use(helmet()).listen(PORT, () => {
    console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
    });

