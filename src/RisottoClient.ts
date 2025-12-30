import React from "react";
import {createRoot, hydrateRoot} from "react-dom/client";
import Router from "./Router";
import router from "../app/http/routes";

export default class RisottoClient {

    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    start() {

        const root = document.getElementById('root');
        const route = (window as any).__ROUTE__ || '';
        const controller = router.getRoute(route);

        if (root?.hasChildNodes()) {
            // Hydrate existing SSR HTML
            hydrateRoot(root, controller());
        } else {
            // Render from scratch (optional)
            const rootContainer = createRoot(root!);
            rootContainer.render(controller());
        }
    }
}