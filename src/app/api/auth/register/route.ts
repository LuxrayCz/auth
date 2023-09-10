import { userRepo } from "@/helpers/api/UsersRepo";
import { registerScehma, registerType } from "@/helpers/schemas/registerSchema";
import { z } from "zod";

export async function POST(req: Request) {
  const body: registerType = await req.json();
  const checkedBody = registerScehma.parse(body);
  try {
    await userRepo.create(checkedBody);
    return new Response("Ok");
  } catch (error) {
    if (error instanceof z.ZodError) return new Response("Invalid request data passed", { status: 422 });
    return new Response("Could not create user, because " + error, { status: 500 });
  }
}
