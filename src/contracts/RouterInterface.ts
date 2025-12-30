import { Controller } from "../types/controller";

export default interface RouterInterface {
    getRoute(urlPattern: string): Controller;
    getRoutes(): Record<string, Controller>;
}

/*
export default class Server {

    private static path: string;
    private static request: Request;
    private static data: Record<string, Record<string, any>> = {};

    static setPath(path: string) {
        Server.path = path;
    }

    static setRequest(req: Request) {
        Server.request = req;
    }

    static async set(dataCollector: Record<string, any> | ((req: Request) => Record<string, any>)) {
        if (typeof window === 'undefined') {

            if (typeof dataCollector === "function") {
                const data = await dataCollector(
                    Server.request
                );

                Server.data[Server.path] = {
                    ...Server.data[Server.path],
                    ...data
                };

                return;
            }

            Server.data[Server.path] = {
                ...Server.data[Server.path],
                ...dataCollector
            };
        }
    }

    static all() {
        return Server.data[Server.path] || {};
    }

    static get(key: string) {

        if (typeof window !== 'undefined') {
            const data = (window as any).__INITIAL_DATA__;

            return data[key] || null;
        }

        return Server.data[Server.path][key] || null;
    }
}*/