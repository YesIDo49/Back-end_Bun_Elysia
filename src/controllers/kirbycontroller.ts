import {Elysia} from "elysia/dist/bun";
import {get} from "http";

export const kirbyController = (app: Elysia) =>
    app.get("/", async (app : Elysia) => {
            return "Hello World";
    });