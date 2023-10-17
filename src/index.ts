import { Elysia, t } from "elysia";
import { AnimeDatabase } from "./db.js";
import { html } from '@elysiajs/html'

new Elysia()
    .use(html())
    .decorate("db", new AnimeDatabase())
    .get("/", () => Bun.file("./src/index.html"))
    .get("/script.js", () => Bun.file("./src/script.js"))
    .get("/animes", ({ db }) => db.getAnimes())
    .post(
        "/animes",
        async ({ db, body }) => {
            const id = (await db.addAnime(body)).id
            return { success: true, id };
        },
        {
            schema: {
                body: t.Object({
                    name: t.String(),
                    mangaka: t.String(),
                }),
            },
        }
    )
    .put(
        "/animes/:id",
        ({ db, params, body }) => {
            try {
                db.updateAnime(parseInt(params.id), body)
                return { success: true };
            } catch (e) {
                return { success: false };
            }
        },
        {
            schema: {
                body: t.Object({
                    name: t.String(),
                    mangaka: t.String(),
                }),
            },
        }
    )
    .delete("/animes/:id", ({ db, params }) => {
        try {
            db.deleteAnime(parseInt(params.id))
            return { success: true };
        } catch (e) {
            return { success: false };
        }
    })
    .listen(3000);