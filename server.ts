import { JsonApi } from "@littlemissrobot/jsonapi-client";
import Application from "./lib/Application";
import router from "./app/http/routes";
import express from "express";

const server = new Application(router);

JsonApi.init({
    baseUrl: '***',
    clientId: '***',
    clientSecret: '***',
});

server.start(express());

export default server;