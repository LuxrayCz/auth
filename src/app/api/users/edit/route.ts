import { userRepo } from "@/helpers/api/UsersRepo";
import { validateUpdate, validateUpdateWithToken } from "@/helpers/schemas/updateSchema";
import { verifyJwt } from "@/lib/token";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    const user = await userRepo.getById(id);

    return new Response(JSON.stringify(user));
  } catch (err) {
    return new Response("Could not find user", { status: 404 });
  }
}
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  try {
    await userRepo.delete(id);

    return new Response("User has been deleted");
  } catch (error) {
    return new Response("Could not delete user", { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = validateUpdateWithToken.parse(body);
    const userId = (await verifyJwt(parsedBody.token)).sub;

    if (!userId) {
      return new Response("Could not find id", { status: 400 });
    }
    const user: UserFromDb = await userRepo.getById(userId);
    // if (user._id.toString() !== userId) {
    //   return new Response("Unauthorized", { status: 401 });
    // }
    const passwordMatch = await userRepo.verifyPassword(parsedBody.confirmPassword, user.hash);
    if (!passwordMatch) {
      return new Response("You entered wrong password", { status: 401 });
    }
    const payload = {
      username: parsedBody.username,
      firstName: parsedBody.firstName,
      lastName: parsedBody.lastName,
    };
    console.log("userId", userId);
    console.log("payload", payload);

    const userY = await userRepo.update2(userId, payload);
    return new Response(JSON.stringify(userY), { status: 200 });
  } catch (error) {
    return new Response("Could not update user" + error, { status: 500 });
  }
}
