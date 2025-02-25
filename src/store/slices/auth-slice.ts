
import { StateCreator } from "zustand";

export interface UserInfo {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    userInfo?: UserInfo;
    setUserInfo: (userInfo: UserInfo) => void;
  }


export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});