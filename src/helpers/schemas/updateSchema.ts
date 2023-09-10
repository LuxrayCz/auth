import { string, z } from "zod";

export const validateUpdate = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain min 3 characters" })
    .max(15, { message: "Username must contain max 15 characters" })
    .nonempty(),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must contain min 3 characters" })
    .max(25, { message: "Password must contain max 25 characters" })
    .nonempty(),
  firstName: z
    .string()
    .min(3, { message: "First name must contain min 3 characters" })
    .max(20, { message: "First name must contain max 20 characters" })
    .nonempty(),
  lastName: z
    .string()
    .min(3, { message: "Last name must contain min 3 characters" })
    .max(20, { message: "Last name must contain max 20 characters" })
    .nonempty(),
});
export const validateUpdateWithToken = z.object({
  username: z
    .string()
    .min(3, { message: "Username must contain min 3 characters" })
    .max(15, { message: "Username must contain max 15 characters" })
    .nonempty(),
  confirmPassword: z
    .string()
    .min(6, { message: "Password must contain min 6 characters" })
    .max(25, { message: "Password must contain max 25 characters" })
    .nonempty(),
  firstName: z
    .string()
    .min(3, { message: "First name must contain min 3 characters" })
    .max(20, { message: "First name must contain max 20 characters" })
    .nonempty(),
  lastName: z
    .string()
    .min(3, { message: "Last name must contain min 3 characters" })
    .max(20, { message: "Last name must contain max 20 characters" })
    .nonempty(),
  token: z.string(),
});

export type updateType = z.infer<typeof validateUpdate>;
export type updateType2 = {
  username: string | undefined;
  confirmPassword: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
};
