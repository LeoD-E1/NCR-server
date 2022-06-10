import { Router } from "restify-router";
import transferController from "../../controllers/Transfer";

const transferRouter = new Router();

transferRouter.get("/:clientNumber", transferController.getTransfersByClient);
transferRouter.post("/", transferController.transferToOwnAccount);

export default transferRouter;
