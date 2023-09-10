"use client";
import { updateType, updateType2, validateUpdate } from "@/helpers/schemas/updateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { useStore } from "../lib/zustand/store";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { TokenType } from "@/helpers/schemas/tokenSchema";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { revalidatePath } from "next/cache";

type mutateUpdateType = updateType & TokenType;

const UpdateUser = ({ token }: { token: string }) => {
  //GET USER
  const [user, setUser] = useState<GlobalUser>();
  const { mutate: getUser } = useMutation({
    mutationFn: async () => {
      const _user: GlobalUser = (await axios.post("/api/users/verify", JSON.stringify(token))).data;
      return _user;
    },
    onError: (err) => {
      console.log("Error ocuried", err);
    },
    onSuccess: (_user: GlobalUser) => {
      setUser(_user);
    },
  });

  //UPDATE USER API CALL
  const { mutate: updateUser } = useMutation({
    mutationFn: async (data: updateType) => {
      const payload: mutateUpdateType = {
        ...data,
        token: token,
      };
      const userD = (await axios.put("/api/users/edit", payload)).data;
      return userD;
    },
    onError: (err) => {
      console.log("Error ocuried", err);
    },
    onSuccess: (userD) => {},
  });

  useEffect(() => {
    getUser();
  }, []);

  //FORM HOOK

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<updateType>({
    resolver: zodResolver(validateUpdate),
    defaultValues: {
      username: user?.username,
      firstName: user?.firstName,
      lastName: user?.lastName,
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<updateType> = (data: updateType) => {
    updateUser(data);
  };

  return (
    <div className="p-4 border-[1.5px] max-w-[300] border-white rounded-lg ">
      <div className="bg-slate-700 p-3 max-w-[300]   border rounded-md">
        <h2 className="text-xl font-bold mb-3">Update profile</h2>
        {user ? (
          <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex  items-center space-x-3">
              <Label htmlFor="username" className="text-md w-[90px]">
                Username:
              </Label>
              <Input className="w-[25%] h-8" id="username" {...register("username", { value: user?.username })} />
              {errors.username && <p className="text-sm"> {errors.username?.message}</p>}
            </div>
            <div className="flex  items-center space-x-3">
              <Label htmlFor="username" className="text-md w-[90px]">
                First Name:
              </Label>
              <Input className="w-[25%] h-8" id="firstName" {...register("firstName", { value: user?.firstName })} />
              {errors.firstName && <p className="text-sm"> {errors.firstName?.message}</p>}
            </div>
            <div className="flex  items-center space-x-3">
              <Label htmlFor="username" className="text-md w-[90px]">
                Last Name:
              </Label>
              <Input className="w-[25%] h-8" id="lastName" {...register("lastName", { value: user?.lastName })} />
              {errors.lastName && <p className="text-sm"> {errors.lastName?.message}</p>}
            </div>
            <div className="flex  items-center space-x-3">
              <Label htmlFor="confirmPassword" className="text-md w-[90px]">
                Confirm password:
              </Label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="w-[25%] h-8"
                id="confirmPassword"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && <p className="text-sm"> {errors.confirmPassword?.message}</p>}
            </div>
            <Button type="submit" variant="outline">
              Update
            </Button>
          </form>
        ) : null}
      </div>
    </div>
  );
};

export default UpdateUser;
