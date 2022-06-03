import { Router } from "restify-router";
import {
  getTransfersByClient,
  transferToOwnAccount,
} from "../../controllers/transfer.controller";

const transferRouter = new Router();

transferRouter.get("/:clientNumber", getTransfersByClient);
transferRouter.post("/", transferToOwnAccount);

export default transferRouter;
