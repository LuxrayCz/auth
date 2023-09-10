import { NextRequest } from "next/server";
import { userRepo } from "../../../../helpers/api/UsersRepo";
export async function GET(req: NextRequest) {
  try {
    const users = await userRepo.getAll();
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response("Could not get users", { status: 500 });
  }
}
