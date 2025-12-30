import { JsonApi } from "@littlemissrobot/jsonapi-client";
import RisottoServer from "./src/RisottoServer";
import router from "./app/http/routes";

const server = new RisottoServer(router);

JsonApi.init({
    baseUrl: process.env.JSON_API_BASE_URL || '',
    clientId: process.env.JSON_API_CLIENT_ID || '',
    clientSecret: process.env.JSON_API_CLIENT_SECRET || '',
});

server.start(3000, (app) => {
    //app.use(responseCache());
});