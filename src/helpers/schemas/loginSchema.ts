import * as z from "zod";
export const loginSchema = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(6).max(25),
});

export type loginType = z.infer<typeof loginSchema>;
