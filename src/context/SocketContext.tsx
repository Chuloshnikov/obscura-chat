import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useAppStore } from "../store";
import { HOST } from "../utils/constants";
import { io, Socket } from "socket.io-client";
import { MessageTypes } from "../../types/index";

type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const socket = useRef<Socket | null>(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id },
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
            });

            const handleReceiveMessage = (data: { message?: MessageTypes }) => {
                if (!data?.message || !data.message.sender) {
                    console.warn("Received invalid message:", data);
                    return;
                }
            
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
            
                if (
                    selectedChatData &&
                    selectedChatType &&
                    (selectedChatData._id === data.message.sender._id || selectedChatData._id === data.message.recipient?._id)
                ) {
                    console.log("Message received:", data.message);
                    addMessage(data.message);
                }
            };

            socket.current.on("receiveMessage", handleReceiveMessage);

            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current ?? null}>
            {children}
        </SocketContext.Provider>
    );
};