import { MessageTypes } from '@/types/index';
import { ChatSlice } from '@/types/index';
import { StateCreator } from 'zustand';

export const createChatSlice: StateCreator<ChatSlice> = (set, get) => ({
    selectedChatType: undefined as ChatSlice['selectedChatType'],
    selectedChatData: undefined as ChatSlice['selectedChatData'],
    selectedChatMessages: [] as ChatSlice['selectedChatMessages'],
    
    setSelectedChatType: (selectedChatType: ChatSlice['selectedChatType']) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData: ChatSlice['selectedChatData']) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages: ChatSlice['selectedChatMessages']) => set({ selectedChatMessages }),
    
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] }),
    addMessage: (message: MessageTypes) => {
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages: [
                ...selectedChatMessages, {
                    ...message,
                    recipient: selectedChatType === "channel" ? message.recipient : message.recipient._id,
                    sender: selectedChatType === "channel" ? message.sender : message.sender._id

                },
            ],
        });
    },
});