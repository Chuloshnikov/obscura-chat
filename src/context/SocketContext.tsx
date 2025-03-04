import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
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

            const handleRecieveMessage = ({ message }: { message: MessageTypes }) => {
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
            
                if (
                    selectedChatData &&
                    selectedChatType &&
                    (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient?._id)
                ) {
                    console.log("message rcv", message);
                    addMessage(message);
                }
            };

            socket.current.on("recieveMessage", handleRecieveMessage);

            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};