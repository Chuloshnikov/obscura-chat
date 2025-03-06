import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";

import EmojiPicker, { Theme, EmojiClickData } from 'emoji-picker-react';
import { useAppStore } from "@/store";
import { useSocket } from "@/context/SocketContext";
import { apiClient } from "../../lib/api-client";
import { UPLOAD_FILE_ROUTE } from "../../utils/constants";

const MessageBar = () => {
    const emojiRef = useRef<HTMLDivElement | null>(null);
    const fileInputRef = useRef();
    const socket = useSocket();
    const { selectedChatType, selectedChatData, userInfo, setIsUploading, setFileUploadProgress } = useAppStore();
    const [message, setMessage] = useState<string>("");
    const [emojiPickerOpen, setEmojiPickerOpen] = useState<boolean>(false);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
                setEmojiPickerOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleAddEmoji = (emoji: EmojiClickData) => {
        setMessage((msg) => msg + emoji.emoji);
    };

    const handleSendMessage = async () => {
        if (selectedChatType === "contact") {
            socket.emit("sendMessage", {
                sender: userInfo.id,
                content: message,
                recipient: selectedChatData._id,
                messageType: "text",
                fileUrl: undefined,
            });
        }
    };

    const handleAttachmentClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleAttachmentChange = async (ev) => {
        try {
            const file = ev.target.files[0];
            if (file) {
                const formData = new FormData();
                setIsUploading(true);
                formData.append("file", file);
                const response = await apiClient.post(UPLOAD_FILE_ROUTE, formData, {
                    withCredentials: true,
                    onUploadProgress: data => {
                        setFileUploadProgress(Math.round((100 * data.loaded) / data.total));
                    }
 =>                 });


                if (response.status === 200 && response.data) {
                    setIsUploading(false);
                    if (selectedChatType === "contact") {
                        socket.emit("sendMessage", {
                            sender: userInfo.id,
                            content: message,
                            recipient: selectedChatData._id,
                            messageType: "file",
                            fileUrl: response.data.filePath,
                        });
                    }
                   
                }
            }
        } catch (error) {
            setIsUploading(false);
            console.log( {error });
        }
    }

    return (
        <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
            <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
                <input
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    value={message}
                    className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none"
                    placeholder="Enter Message"
                />
                <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all">
                    <GrAttachment className="text-2xl" />
                </button>
                <input type="file" className="hidden" ref={fileInputRef} onChange={handleAttachmentChange}/>
                <div className="relative">
                    <button
                        onClick={() => setEmojiPickerOpen((prev) => !prev)}
                        className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
                    >
                        <RiEmojiStickerLine className="text-2xl" />
                    </button>
                    {emojiPickerOpen && (
                        <div ref={emojiRef} className="absolute bottom-16 right-0">
                            <EmojiPicker theme={Theme.DARK} onEmojiClick={handleAddEmoji} autoFocusSearch={false} />
                        </div>
                    )}
                </div>
            </div>
            <button
                onClick={handleSendMessage}
                className="bg-red-500 rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-red-900 focus:bg-red-900 focus:outline-none focus:text-white duration-300 transition-all"
            >
                <IoSend className="text-2xl" />
            </button>
        </div>
    );
};

export default MessageBar;