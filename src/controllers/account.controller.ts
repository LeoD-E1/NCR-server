import { Request, Response } from "restify";

export const getAccountsByClient = async (req: Request, res: Response) => {
  console.log(req.params.clientNumber);
  return res.json({
    message: "getAccountsByClient",
  });
};
export const getAccountbyClientNumber = (req: Request, res: Response) => {
  return res.json({
    message: "getAccountbyClientNumber",
  });
};
