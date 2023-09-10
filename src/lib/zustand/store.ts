import { create } from "zustand";

export const useStore = create<{
  username: string;
  firstName: string;
  lastName: string;
  updatedAt: Date;
}>((set) => ({
  username: "",
  firstName: "",
  lastName: "",
  updatedAt: new Date(),
}));
