import { MessageTypes } from '@/types/index';
import { ChatSlice } from '@/types/index';
import { StateCreator } from 'zustand';

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
    selectedChatType: undefined as ChatSlice['selectedChatType'],
    selectedChatData: undefined as ChatSlice['selectedChatData'],
    selectedChatMessages: [] as ChatSlice['selectedChatMessages'],
    directMessagesContacts: [] as ChatSlice['directMessagesContacts'],
    isUploading: false,
    isDownloading: false,
    fileUploadProgress: 0,
    fileDownloadProgress: 0,
    setIsUploading: (isUploading: boolean) => set({isUploading}),
    setIsDownloading: (isDownloading: boolean) => set({isDownloading}),
    setFileUploadProgress: (fileUploadProgress: number) => set({fileUploadProgress}),
    setFileDownloadProgress: (fileDownloadProgress: number) => set({fileDownloadProgress}),
    setSelectedChatType: (selectedChatType: ChatSlice['selectedChatType']) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData: ChatSlice['selectedChatData']) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages: ChatSlice['selectedChatMessages']) => set({ selectedChatMessages }),
    setDirectMessagesContacts: (directMessagesContacts: ChatSlice['directMessagesContacts']) => set({ directMessagesContacts}),
    
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] }),
    addMessage: (message: MessageTypes) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages, 
                {
                    ...message,
                    recipient: selectedChatType === "channel" ? message.recipient : message.recipient._id,
                    sender: selectedChatType === "channel" ? message.sender : message.sender._id

                },
            ],
        });
    },
});