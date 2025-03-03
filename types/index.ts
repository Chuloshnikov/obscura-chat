export interface UserInfo {
    id: string;
    name: string;
    email: string;
  }
  
  export interface AuthState {
    userInfo?: UserInfo;
    setUserInfo: (userInfo: UserInfo) => void;
  }

export interface ContactTypes {
    _id: FormDataEntryValue;
    email: string;
    image: string;
    firstName: string;
    lastName: string;

  }

  
export interface ChatSlice {
  selectedChatType?: string;
  selectedChatData?: string;
  selectedChatMessages: string[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: ContactTypes | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: string[]) => void;
  closeChat: () => void;
}


export type MessageType = "text" | "file";

export interface MessageTypes {
    id?: string; 
    sender: string; 
    recipient?: string; 
    messageType: MessageType;
    content?: string; 
    fileUrl?: string; 
    timestamp?: string; 
}