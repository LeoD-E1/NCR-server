import { Router } from "restify-router";
import clientController from "../../controllers/Client/index";

const clientRouter = new Router();

clientRouter.get("/", clientController.getClients);
clientRouter.post("/", clientController.createClient);

export default clientRouter;
