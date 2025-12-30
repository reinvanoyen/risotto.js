import "dotenv/config";
import express, {Express} from "express";
import path from "path";
import ReactDOMServer from "react-dom/server";
import Router from "./Router";
import { createServer as createViteServer } from "vite";
import React from "react";
import Server from "./Server";
import NotFound from "./errors/NotFound";

export default class RisottoServer {

    private ssrOutlet: string = '<!--ssr-outlet-->';

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    renderHtml(url: string) {
        return `
            <!DOCTYPE html>
            <html>
            <head>
                <title>SSR POC</title>
            </head>
            <body>
            <div id="root">${this.ssrOutlet}</div>
            <script>window.__ROUTE__ = "${url}";</script>
            <script>window.__INITIAL_DATA__ = ${JSON.stringify(Server.all())}</script>
            <!-- Vite HMR -->
            <script type="module" src="/@vite/client"></script>
            <script type="module" src="/client.ts"></script>
            </body>
            </html>
        `;
    }

    async renderRouteComponent(url: string) {
        const routeFn = this.router.getRoute(url);

        if (!routeFn) return '';

        const component = await routeFn() as React.ReactElement;

        return ReactDOMServer.renderToString(component);
    }

    async start(port: number = 3000, callback?: (app: Express) => void) {

        const expressServer = express();

        const viteServer = await createViteServer({
            server: { middlewareMode: true }
        });

        expressServer.use(viteServer.middlewares);
        expressServer.use("/static", express.static(path.join(__dirname, "../dist/static")));

        if (callback) {
            callback(expressServer);
        }

        // Register the routes
        const urls = Object.keys(this.router.getRoutes());

        urls.forEach(url => {
            expressServer.get(url, async (req, res, next) => {

                try {
                    Server.setRequest(req);

                    const path: string = req.route.path;
                    const ssrReactHtml = await this.renderRouteComponent(path);
                    const baseHtml = this.renderHtml(path);

                    if (viteServer) {
                        const html = await viteServer.transformIndexHtml(req.url, baseHtml.replace(this.ssrOutlet, ssrReactHtml))
                        res.send(html);
                        return;
                    }

                    res.send(baseHtml.replace(this.ssrOutlet, ssrReactHtml));
                } catch(error) {
                    if (error instanceof NotFound) {
                        console.log(error);
                        // todo implement 404 api
                        res.send('Notfound');
                    } else {
                        throw error;
                    }
                }
            });
        });

        expressServer.listen(port);
    }
}