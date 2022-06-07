import { Router } from "restify-router";
import { getClients, createClient } from "../../controllers/client.controller";

const clientRouter = new Router();

clientRouter.get("/", getClients);
clientRouter.post("/", createClient);

export default clientRouter;
