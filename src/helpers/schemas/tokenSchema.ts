import { z } from "zod";

export const tokenValidate = z.object({
  token: z.string(),
});
export type TokenType = z.infer<typeof tokenValidate>;
