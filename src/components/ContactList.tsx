import React from 'react'
import { useAppStore } from '../store';
import { Avatar, AvatarImage } from './ui/avatar';
import { HOST } from '../utils/constants';
import { getColor } from '../lib/utils';

const ContactList = ({ contacts, isChannel = false }: { contacts: any, isChannel: boolean }) => {

    const {
        selectedChatData, 
        setSelectedChatData, 
        setSelectedChatType, 
        selectedChatType,
        setSelectedChatMessages,
    } = useAppStore();

    const handleClick = ({contact}: any) => {
        if (isChannel) setSelectedChatType("channel");
        else setSelectedChatType("contact");
        setSelectedChatData(contact);
        if (selectedChatData && selectedChatData._id !== contact._id) {
            setSelectedChatMessages([]);
        }
    }
  return (
    <div className='mt-5'>
        {contacts.map(contact => 
        (<div 
            className={`pl-10 py-2 transition-all duration-300 cursor-pointer 
                ${selectedChatData && (selectedChatData._id === contact._id ? "bg-[#ffffff22] border-2 border-white/70" : getColor(contact.color)) 
                    ? "bg-red-500 hover:bg-red-600" 
                    : "hover:bg-[#f1f1f111]"}`}
        key={contact._id}
        onClick={() => handleClick(contact)}
        >
            <div className='flex gap-5 items-center justify-start text-neutral-300'>
                    {
                        !isChannel && (
                            <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                                {contact?.image ? 
                                <AvatarImage src={`${HOST}/${contact?.image}`} 
                                alt="profile" 
                                className="object-cover w-full h-full bg-black"
                                /> : (
                                <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact?.color)}`}>
                                    {contact?.firstName ? contact?.firstName?.split("").shift()  : contact?.email.split("").shift()}
                                </div>
                                )}
                            </Avatar>
                        )
                    }
                    {
                        isChannel && <div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center'>#</div>
                    }
                    {
                        isChannel ? <span>{contact.name}</span> : <span>{`${contact.firstName} ${contact.lastName}`}</span>
                    }
            </div>
        </div>
    ))}
    </div>
  )
} 

export default ContactList;