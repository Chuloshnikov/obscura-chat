
import { StateCreator } from "zustand";

export interface UserInfo {
    id: string;
    email: string;
    firstName?: string;
    lastName?:  string;
    profileSetup?: boolean;
    image?: string
    color?: number,
  }

  export interface AuthState {
    userInfo?: UserInfo; 
    setUserInfo: (userInfo: UserInfo | undefined | null) => void;
  }

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  userInfo: undefined,
  setUserInfo: (userInfo) => set({ userInfo }),
});