import { Response, Request } from "express";
import { errorHandler } from "./error-handler";
import { jwtMiddleware } from "./jwtMiddlewa";

const apiHandler = (handler: any) => {
  return async (req: Request, res: Response) => {
    const method = req.method.toLowerCase();
    if (!handler[method]) {
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
      // TODO
      // await jwtMiddleware(req, res);

      await handler[method](req, res);
    } catch (error) {
      errorHandler(error, res);
    }
  };
};
export { apiHandler };
