import { Controller } from "./types/controller";

export default class Router {

    private routes: Record<string, Controller> = {};

    get(url: string, controller: Controller) {
        this.routes[url] = controller;
    }

    getRoute(url: string) {
        return this.routes[url];
    }

    getRoutes(): Record<string, Controller> {
        return this.routes;
    }
}