"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { registerScehma, registerType } from "@/helpers/schemas/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  //TOASTER
  const { toast } = useToast();
  //ROUTER
  const router = useRouter();
  //MUTATION
  const { mutate: createUser, isLoading } = useMutation({
    mutationFn: async ({ username, password, firstName, lastName }: registerType) => {
      const payload: registerType = {
        username,
        firstName,
        password,
        lastName,
      };
      const response = await axios.post("/api/auth/register", payload);
    },
    onError: (err: any) => {
      return toast({
        title: "Problem with registration",
        description: err.response.data,
        variant: "destructive",
      });
    },
    onMutate: () => {
      console.log("proceeding");
    },
    onSuccess: () => {
      router.push("/login");
    },
  });

  //SUBMIT
  const onSubmit = (data: registerType) => {
    createUser(data);
  };

  // FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>({
    resolver: zodResolver(registerScehma),
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      username: "",
    },
  });

  return (
    <div className="bg-slate h-screen flex items-center justify-center">
      <Card className="bg-slate-900 w-[350px]  border-white border-r-2 text-slate-50">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>You need to be authorized to view this site</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid w-full items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Username</Label>
              <Input id="username" type="text" className="text-black font-[500] h-[35px]" placeholder="Username" {...register("username")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Password</Label>
              <Input id="password" type="password" className="text-black font-[500] h-[35px]" placeholder="Password" {...register("password")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">First Name</Label>
              <Input id="firstName" type="text" className="text-black font-[500] h-[35px]" placeholder="John" {...register("firstName")} />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Last Name</Label>
              <Input id="lastName" type="text" className="text-black font-[500] h-[35px]" placeholder="Doe" {...register("lastName")} />
            </div>
            <Button type="submit" variant={"ghost"} disabled={isLoading} className="text-white border-white border-[1px] w-[30%] mt-2">
              Register
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
