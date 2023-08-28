import { jwtVerify } from "jose";

export const verifyJwt = async <T>(token: string) => {
  try {
    return (await jwtVerify(token, new TextEncoder().encode(process.env.JWT_KEY))).payload;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired");
  }
};
