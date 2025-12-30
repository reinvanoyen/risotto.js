import { Request } from "express";

export default class Server {

    /**
     * The current request
     * @private
     */
    private static request: Request;

    // The data gathered throughout the request cycle
    private static data: Record<string, Record<string, any>> = {};

    /**
     * Sets the request
     * @param req
     */
    static setRequest(req: Request) {
        Server.request = req;
    }

    /**
     *
     * @param key
     * @param valueCollector
     */
    static async set(key: string, valueCollector: (req: Request) => any) {
        if (typeof window === 'undefined') {

            const payload: Record<string, any> = {};
            payload[key] = await valueCollector(Server.request);

            Server.data[Server.request.path] = {
                ...Server.data[Server.request.path],
                ...payload
            };
        }
    }

    /**
     *
     * @param dataCollector
     */
    static async setAll(dataCollector: Record<string, any> | ((req: Request) => Record<string, any>)) {
        if (typeof window === 'undefined') {

            if (typeof dataCollector === "function") {
                const data = await dataCollector(
                    Server.request
                );

                Server.data[Server.request.path] = {
                    ...Server.data[Server.request.path],
                    ...data
                };
            }

            Server.data[Server.request.path] = {
                ...Server.data[Server.request.path],
                ...dataCollector
            };
        }
    }

    /**
     *
     * @param key
     */
    static get(key: string) {
        if (typeof window !== 'undefined') {
            const data = (window as any).__INITIAL_DATA__;

            return data[key] || null;
        }

        return Server.data[Server.request.path][key] || null;
    }

    /**
     *
     */
    static all() {
        return Server.data[Server.request.path] || {};
    }
}