import { create } from "zustand";
import { AuthState, createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";


export const useAppStore = create<AuthState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a)
}));