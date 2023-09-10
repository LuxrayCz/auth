import * as z from "zod";
export const registerScehma = z.object({
  username: z.string().min(3).max(25),
  password: z.string().min(6).max(25),
  firstName: z.string().min(3).max(25),
  lastName: z.string().min(3).max(25),
});

export type registerType = z.infer<typeof registerScehma>;
