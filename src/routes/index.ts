/**
 *  Principal routes component
 */
import { Router } from "restify-router";
import accountRouter from "./account/account.routes";
import transferRouter from "./transfer/transfer.routes";
// importing routes

const router = new Router();
const listOfRoutes = new Router();

router.add("/api/v1", listOfRoutes);

listOfRoutes.add("/account", accountRouter);
listOfRoutes.add("/transfer", transferRouter);

export default router;
