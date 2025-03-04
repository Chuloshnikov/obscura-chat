export interface UserInfo {
    _id: FormDataEntryValue;
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

  
export type MessageType = "text" | "file";

  
  export interface MessageTypes {
    _id?: FormDataEntryValue; 
    sender: FormDataEntryValue; 
    recipient?: FormDataEntryValue; 
    messageType: MessageType;
    content?: string; 
    fileUrl?: string; 
    timestamp?: string; 
}
  
export interface ChatSlice {
  selectedChatType?: string;
  selectedChatData?: string;
  selectedChatMessages: string[];
  setSelectedChatType: (selectedChatType: string | undefined) => void;
  setSelectedChatData: (selectedChatData: ContactTypes | undefined) => void;
  setSelectedChatMessages: (selectedChatMessages: MessageTypes[]) => void;
  closeChat: () => void;
}


