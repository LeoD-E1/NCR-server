/**
 *  Principal routes component
 */
import { Router } from "restify-router";
import accountRouter from "./account/account.routes";
import transferRouter from "./transfer/transfer.routes";
import clientRouter from "./client/client.routes";
import { Request, Response } from "restify";
// importing routes

const router = new Router();
const listOfRoutes = new Router();

router.add("/api/v1", listOfRoutes);

listOfRoutes.get("/", (req: Request, res: Response) => {
  res.json({ message: "V1 of api " });
});
listOfRoutes.add("/account", accountRouter);
listOfRoutes.add("/transfer", transferRouter);
listOfRoutes.add("/client", clientRouter);

export default router;
