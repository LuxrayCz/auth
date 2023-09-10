import { userRepo } from "@/helpers/api/UsersRepo";
import { loginSchema } from "@/helpers/schemas/loginSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const checkedBody = loginSchema.parse(body);
    const response = await userRepo.authenticate(checkedBody);
    return response;
  } catch (error: any) {
    return new Response("Could not login, because " + error, { status: 500 });
  }
}
