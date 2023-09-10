import LoggedUser from "@/components/LoggedUser";

import UpdateUser from "@/components/UpdateUser";
import UsersComp from "@/components/UsersComp";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const cookieStore = cookies();
  const isLogged = cookieStore.get("logged-in");
  const token = cookieStore.get("token");

  if (!isLogged) {
    return redirect("/login");
  }
  let val: string = "";
  if (token) {
    val = token?.value;
  }

  return (
    <main className="max-w-[800px] mx-auto ">
      <UsersComp />
      <LoggedUser token={val} />
      <UpdateUser token={val} />
    </main>
  );
}
