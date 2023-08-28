import { Response } from "express";
import { expressjwt } from "express-jwt";
import util from "util";

const jwtMiddleware = (req: any, res: Response) => {
  const middleware = expressjwt({ secret: process.env.JWT_KEY!, algorithms: ["HS256"] }).unless({
    path: ["/api/users/register", "/api/users/authenticate"],
  });
  return util.promisify(middleware)(req, res);
};

export { jwtMiddleware };
