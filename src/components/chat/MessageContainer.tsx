import { useAppStore } from "@/store";
import { useEffect, useRef } from "react";
import moment from "moment";
import { MessageTypes } from "@/types/index";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE } from "../../utils/constants";

const MessageContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { 
    selectedChatType, 
    selectedChatData, 
    userInfo, 
    selectedChatMessages, 
    setSelectedChatMessages 
  } = useAppStore();
  console.log(selectedChatMessages);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE, 
          {id: selectedChatData._id}, 
          {withCredentials: true}
        );

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log({error});
      }
    }
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
}, [selectedChatMessages]);
  
  
  const renderDMMessages = (message: MessageTypes) => (
    <div 
      className={`${
        message.sender === userInfo.id ? "text-left" : "text-right"
      }`}
    >
      {message.messageType === "text" && (
        <div 
          className={`${
            message.sender !== selectedChatData?._id 
              ? "bg-red-500/5 text-red-500/90 border-red-500/50" 
              : "bg-[2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.timestamp).format("LT")}
      </div>
    </div>
  );

  const renderMessages = () => {
    let lastDate: string | null = null;
    return selectedChatMessages.map((message: MessageTypes, index: number) => {
      const messageDate = moment(message.timestamp).format("DD-MM-YYYY");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      const isLastMessage = index === selectedChatMessages.length - 1; // Проверка на последнее сообщение
  
      return (
        <div key={index} ref={isLastMessage ? scrollRef : null}>
          {showDate && (
            <div className="text-center text-gray-500 my-2">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  return (
    <div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full'>
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
