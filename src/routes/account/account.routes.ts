import { Router } from "restify-router";
import {
  getAccountByClientNumber,
  getAccountsByClient,
} from "../../controllers/account.controller";

const accountRouter = new Router();

accountRouter.get("/:clientNumber", getAccountsByClient);
accountRouter.get("/:clientNumber/:accountNumber", getAccountByClientNumber);

export default accountRouter;
