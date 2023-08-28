import { userRepo } from "@/helpers/api/UsersRepo";

export async function POST(req: Request) {
  const body = await req.json();
  const user = await userRepo.authenticate(body);
  return new Response(JSON.stringify(user));
}
