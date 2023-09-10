"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { copyFile } from "fs/promises";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import { useStore } from "@/lib/zustand/store";

const LoggedUser = ({ token }: { token: string }) => {
  const [user, setUser] = useState<User | null>(null);

  const { mutate: getUser } = useMutation({
    mutationFn: async () => {
      const userFromAPI = await axios.post("/api/users/verify", JSON.stringify(token));
      const userRes: User = userFromAPI.data;

      return userRes;
    },
    onSuccess: (userX) => {
      setUser(userX);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="p-4 border-[1.5px] max-w-[300] border-white rounded-lg ">
      <div className="bg-slate-700 p-3 max-w-[300]  max-h-[200px] border rounded-md">
        <div className="flex space-x-3">
          <h2 className="font-bold">Username: </h2>
          <span>{user?.username}</span>
        </div>
        <div className=" flex space-x-3">
          <h2 className="font-bold">First name: </h2>
          <span>{user?.firstName}</span>
        </div>
        <div className="flex space-x-3">
          <h2 className="font-bold">Last name: </h2>
          <span>{user?.lastName}</span>
        </div>
        <div className="flex space-x-3">
          <h2 className="font-bold">Created at: </h2>
          <span>{dayjs(user?.createdAt).format("DD/MM")}</span>
        </div>
      </div>
    </div>
  );
};

export default LoggedUser;
