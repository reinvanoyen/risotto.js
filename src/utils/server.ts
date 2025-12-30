import {Request} from "express";
import Server from "../Server";

const server = {
    async only(execute: ((req: Request) => Record<string, any>)) {
        return await Server.setAll(execute);
    },
    async set(key: string, execute: ((req: Request) => any)) {
        return await Server.set(key, execute);
    },
    get(key: string) {
        return Server.get(key);
    }
};

export default server;