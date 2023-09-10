"use client";

import { Separator } from "@radix-ui/react-separator";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { SetStateAction, useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import dayjs from "dayjs";

const UsersComp = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  const { mutate: getUsers, isLoading } = useMutation({
    mutationFn: async () => {
      const users: User[] = await (await axios.get("/api/users/get")).data;
      setUsers(users);
      console.log(users);
    },
    onSuccess: () => {
      setShow(true);
    },
  });

  return (
    <div className="p-4 border-[1.5px] border-white rounded-lg ">
      <Button variant={"outline"} disabled={isLoading} onClick={() => getUsers()} className="mb-3">
        Get Users
      </Button>
      {users.length !== 0 ? (
        <ScrollArea className=" bg-slate-700  max-h-[500px] border rounded-md">
          <div className="pt-2 px-4">
            <div className="flex space-x-2 font-bold  mb-2 px-2">
              <h4 className="w-[25%]">Username</h4>
              <h4 className="w-[25%]">First Name</h4>
              <h4 className="w-[25%]">Last Name</h4>
              <h4 className="w-[25%]">Created At</h4>
            </div>
            {users.map((oneUser) => (
              <div key={oneUser.id}>
                <div className="flex justify-between hover:bg-slate-200 hover:bg-opacity-30 px-2 py-1 rounded-md space-x-2 hover:font-[500] hover:text-[#531516] hover:cursor-pointer">
                  <h4 className="w-[25%]">{oneUser.username}</h4>
                  <h4 className="w-[25%]">{oneUser.firstName}</h4>
                  <h4 className="w-[25%]">{oneUser.lastName}</h4>
                  <h4 className="w-[25%]">{dayjs(oneUser.createdAt).format("DD/MM HH:mm")}</h4>
                </div>
                <Separator className="my-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      ) : null}
    </div>
  );
};

export default UsersComp;
