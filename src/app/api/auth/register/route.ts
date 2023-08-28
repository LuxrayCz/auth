import { apiHandler } from "@/helpers/api/api-handler";
import { userRepo } from "@/helpers/api/UsersRepo";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    await userRepo.create(body);
    return new Response("Ok");
  } catch (error) {
    return new Response("Could not create user, because " + error, { status: 500 });
  }
}
