import { verifyJwt } from "@/lib/token";
import { NextRequest } from "next/server";
import { userRepo } from "@/helpers/api/UsersRepo";
export async function POST(req: NextRequest) {
  const token = await req.json();
  try {
    const userId = (await verifyJwt(token)).sub;
    if (!userId) {
      return new Response("Could not find id", { status: 400 });
    }
    const user = await userRepo.getById(userId);
    if (!user) {
      return new Response("Could not find user", { status: 400 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response("The error is " + error, { status: 500 });
  }
}
