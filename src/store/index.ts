import { create } from "zustand";
import { createAuthSlice } from "./slices/auth-slice";
import { AuthState } from "@/types/auth";

export const useAppStore = create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
}));