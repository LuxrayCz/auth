import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="bg-slate h-screen flex items-center justify-center">
      <Card className="bg-slate-900 w-[350px]  border-white border-r-2 text-slate-50">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>You need to be authorized to view this site</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid w-full items-center gap-4">
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Username</Label>
              <Input type="text" className="text-black font-[500] h-[35px]" placeholder="Username" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Password</Label>
              <Input type="password" className="text-black font-[500] h-[35px]" placeholder="Password" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">First Name</Label>
              <Input type="text" className="text-black font-[500] h-[35px]" placeholder="John" />
            </div>
            <div className="flex flex-col gap-2">
              <Label className="pl-1 ">Last Name</Label>
              <Input type="text" className="text-black font-[500] h-[35px]" placeholder="Doe" />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button variant={"ghost"} className="text-white border-white border-[1px]">
            Register
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
