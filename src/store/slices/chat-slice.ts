import { ChatSlice } from '@/types/index';
import { StateCreator } from 'zustand';

export const createChatSlice: StateCreator<ChatSlice> = (set) => ({
    selectedChatType: undefined as ChatSlice['selectedChatType'],
    selectedChatData: undefined as ChatSlice['selectedChatData'],
    selectedChatMessages: [] as ChatSlice['selectedChatMessages'],
    
    setSelectedChatType: (selectedChatType: ChatSlice['selectedChatType']) => set({ selectedChatType }),
    setSelectedChatData: (selectedChatData: ChatSlice['selectedChatData']) => set({ selectedChatData }),
    setSelectedChatMessages: (selectedChatMessages: ChatSlice['selectedChatMessages']) => set({ selectedChatMessages }),
    
    closeChat: () => set({ selectedChatData: undefined, selectedChatType: undefined, selectedChatMessages: [] }),
});