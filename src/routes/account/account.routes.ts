import { Router } from "restify-router";
import accountController from "../../controllers/Account/index";

const accountRouter = new Router();

accountRouter.get("/:clientNumber", accountController.getAccountsByClient);
accountRouter.get(
  "/:clientNumber/:accountNumber",
  accountController.getAccountByClientNumber
);

export default accountRouter;
