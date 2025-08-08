import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from "@angular/ssr/node";
import express from "express";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function app(): express.Express {
  const server = express();

  const serverDistFolder = dirname(fileURLToPath(import.meta.url));
  const browserDistFolder = resolve(serverDistFolder, "../browser");

  const indexHtmlPath = join(serverDistFolder, "index.server.html");

  const angularApp = new AngularNodeAppEngine();

  server.set("view engine", "html");
  server.set("views", browserDistFolder);

  server.get("/api/test", (req: express.Request, res: express.Response) => {
    res.send({ message: "Hello from the API!" });
  });

  /**
   * Serve static files from /browser
   */
  server.use(
    express.static(browserDistFolder, {
      maxAge: "1y",
      index: false,
      redirect: false,
    }),
  );

  /**
   * Handle all other requests by rendering the Angular application.
   */
  server.use((req, res, next) => {
    angularApp
      .handle(req)
      .then((response) =>
        response ? writeResponseToNodeResponse(response, res) : next(),
      )
      .catch(next);
  });

  /**
   * Start the server if this module is the main entry point.
   * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
   */
  if (isMainModule(import.meta.url)) {
    const port = process.env["PORT"] || 4000;
    server.listen(port, () => {
      console.log(`Node Express server listening on http://localhost:${port}`);
    });
  }

  return server;
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */

const server = app();
export const reqHandler = createNodeRequestHandler(server);
