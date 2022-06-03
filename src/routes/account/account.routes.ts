import { Router } from "restify-router";
import {
  getAccountbyClientNumber,
  getAccountsByClient,
} from "../../controllers/account.controller";

const accountRouter = new Router();

accountRouter.get("/:clientNumber", getAccountsByClient);
accountRouter.get("/:clientNumber/:accountNumber", getAccountbyClientNumber);

export default accountRouter;
