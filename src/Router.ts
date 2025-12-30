import { Controller } from "./types/controller";
import RouterInterface from "./contracts/RouterInterface";

export default class Router implements RouterInterface {

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