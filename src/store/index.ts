import { create } from "zustand";
import { AuthState, createAuthSlice } from "./slices/auth-slice";
import { createChatSlice } from "./slices/chat-slice";
import { ChatSlice } from "../../types";


export const useAppStore = create<AuthState & ChatSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createChatSlice(...a),
}));