import { Elysia } from 'elysia';
import './database/db.setup';
import { usersController } from './controllers/users.controller';
import { staticDataController } from './controllers/static-data.controller';
import {html} from "@elysiajs/html/dist";
import {swagger} from "@elysiajs/swagger";

const PORT = process.env.PORT || 3000;
export const app = new Elysia();

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
                    { name: 'Crud', description: 'CRUD for users' }
                ]
            },
        }))
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
    .listen(PORT, () => {
        console.log(`🦊 Elysia is running at ${app.server?.hostname}:${PORT}`);
    });