import { Elysia } from "elysia";
import { createTables } from "./utils/createTables";
import { authRouter } from "./routes/authRouter";
import { platformRouter } from "./routes/platformRouter";
import { html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import jwt from "@elysiajs/jwt";

createTables();

const app = new Elysia()
  // Plugins
  .use(jwt({ name: "jwt", secret: process.env.JWT_SECRET!, exp: "1d" }))
  .derive(async ({ jwt, cookie: { token } }) => {
    if (!token.value) return {};
    const payload = await jwt.verify(token.value);
    return { user: payload };
  })
  .onBeforeHandle(async ({ path, user, set }) => {
    if (path.endsWith("/submit") && !user) return (set.redirect = "/login");
  })
  .use(html())
  .use(staticPlugin())

  // Router
  .use(authRouter)
  .use(platformRouter)

  // Port
  .listen(process.env.PORT!);

console.log("workany running at", app.server?.port);
