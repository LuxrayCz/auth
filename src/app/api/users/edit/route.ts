import { userRepo } from "@/helpers/api/UsersRepo";

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
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response("You have to provide id");
    }
    const body = await req.json();
    await userRepo.update(id, body);
    return new Response("Ok");
  } catch (error) {
    return new Response("Could not update user", { status: 500 });
  }
}
