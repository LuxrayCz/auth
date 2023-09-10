"use client";

import { useStore } from "@/lib/zustand/store";
import { useRef } from "react";

function StoreInitiliazer({ username, firstName, lastName, updatedAt }: { username: string; firstName: string; lastName: string; updatedAt: Date }) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useStore.setState({ username, firstName, lastName, updatedAt });
  }
  return null;
}
export default StoreInitiliazer;
