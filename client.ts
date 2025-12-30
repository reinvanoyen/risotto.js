import RisottoClient from "./src/RisottoClient";
import router from "./app/http/routes";

const client = new RisottoClient(router);

client.start();