"use client";
import { useRouter } from "next/navigation";
import React from "react";

const CookiesDisplay = (isLogged: any) => {
  const { isLogged: logged } = isLogged;
  const router = useRouter();
  if (!logged) {
    return router.push("/login");
  }
  return <div>Hello</div>;
};

export default CookiesDisplay;
