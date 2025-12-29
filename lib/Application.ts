import express, { Express, Request, Response, NextFunction } from "express";
import path from "path";
import ReactDOMServer from "react-dom/server";
import Router from "./Router";
import { createServer as createViteServer, ViteDevServer } from "vite";
import React from "react";
import Server from "./Server";
import responseCache from "./http/middleware/response-cache";

export default class Application {

    private ssrOutlet: string = '<!--ssr-outlet-->';

    private vite: ViteDevServer | null = null;

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

    async start(app: Express) {

        this.vite = await createViteServer({
            server: { middlewareMode: true }
        });

        // Vite handles /@vite/client and module loading
        app.use(this.vite.middlewares);
        app.use(responseCache());
        app.use("/static", express.static(path.join(__dirname, "../dist/static")));

        // Register the routes
        const urls = Object.keys(this.router.getRoutes());

        urls.forEach(url => {
            app.get(url, async (req, res, next) => {

                Server.setPath(req.path);
                Server.setRequest(req);

                const path: string = req.route.path;
                const ssrReactHtml = await this.renderRouteComponent(path);
                const baseHtml = this.renderHtml(path);

                if (this.vite) {
                    const html = await this.vite.transformIndexHtml(req.url, baseHtml.replace(this.ssrOutlet, ssrReactHtml))
                    res.send(html);
                    return;
                }

                res.send(baseHtml.replace(this.ssrOutlet, ssrReactHtml));
            });
        });

        app.listen(3000);
    }
}