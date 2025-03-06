import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { MessageTypes } from "@/types/index";
import { apiClient } from "@/lib/api-client";
import { GET_ALL_MESSAGES_ROUTE, HOST } from "../../utils/constants";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

const MessageContainer: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { 
    selectedChatType, 
    selectedChatData, 
    userInfo, 
    selectedChatMessages, 
    setSelectedChatMessages 
  } = useAppStore();
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

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


  const checkIfImage = (filePath: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const dawnloadFile = async (url: any) => {
    const response = await apiClient.get(`${HOST}/${url}`, 
      {responseType: "blob"}
    );
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };
  
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
      {
        message.messageType === "file" && (
          <div 
          className={`${
            message.sender !== selectedChatData?._id 
              ? "bg-red-500/5 text-red-500/90 border-red-500/50" 
              : "bg-[2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {checkIfImage(message.fileUrl) ? (
          <div className="cursor-pointer">
            <img src={`${HOST}/${message.fileUrl}`} alt="image file" height={300} width={300}/>
          </div>
          ) : (
          <div className="flex items-center justify-center gap-4">
            <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
              <MdFolderZip/>
            </span>
            <span>{message.fileUrl.split("/").pop()}</span>
            <span 
            onClick={() => }
            className="bg-black/20 p-3 text-3xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoMdArrowRoundDown/>
            </span>
          </div>
        )}
        </div>
        )
      }
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
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg">
          <div>
            <img 
            src={`${HOST}/${imageUrl}`}
            className="h-[80vh] w-full bg-cover"
            />
          </div>
          <div className="flex gap-5 fixed top-0 mt-5">
            <button 
            onClick={() => dawnloadFile(imageUrl)}
            className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoMdArrowRoundDown/>
            </button>
            <button 
            onClick={() => {
              setShowImage(false)
              setImageUrl(null)
            }}
            className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
            >
              <IoCloseSharp/>
            </button>
          </div>
        </div>
        )
        }
    </div>
  );
};

export default MessageContainer;
