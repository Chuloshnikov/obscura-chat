import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "../ui/input";
import Lottie from "react-lottie";
import { animationDefaultOptions, getColor } from "../../lib/utils";
import { HOST, SEARCH_CONTACTS_ROUTES } from "../../utils/constants";
import { apiClient } from "../../lib/api-client";
import { Avatar, AvatarImage } from "../ui/avatar";

import ContactTypes from "@/types"
import { useAppStore } from "@/store";


const NewDM = () => {
    const { setSelectedChatData, setSelectedChatType } = useAppStore();
    const [openNewContactModal, setOpenNewContactModal] = useState(false);
    const [searchedContacts, setSearchedContacts] = useState([]);

    const searchContacts = async (searchTerm: string): Promise<void> => {
        try {
            if (searchTerm.length > 0) {
                const response = await apiClient.post(
                    SEARCH_CONTACTS_ROUTES,
                    { searchTerm },
                    { withCredentials: true }
                );
                if (response.status === 200 && response.data.contacts) {
                    setSearchedContacts(response.data.contacts);
                } else {
                    setSearchedContacts([]);
                }
            }
        } catch (error) {
            console.error("Error searching contacts:", error);
        }
    };

    const selectNewContact = (contact: ContactTypes) => {
        setOpenNewContactModal(false);
        setSelectedChatType("contact");
        setSelectedChatData(contact);
        setSearchedContacts([]);
    }

  return (
    <>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <FaPlus
                    onClick={() => setOpenNewContactModal(true)}
                    className="text-neutral-400 font-light text-opacity-90 text-start
                     hover:text-neutral-100 cursor-pointer transition-all duration-300"
                    />
                </TooltipTrigger>
                <TooltipContent
                className="bg-[#1c1b1e] border-none mb-2 p-3 text-white"
                >
                    Select New Contact
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <Dialog 
        open={openNewContactModal} 
        onOpenChange={setOpenNewContactModal}
        >
            <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
                <DialogHeader>
                <DialogTitle>Please select a contact</DialogTitle>
                <DialogDescription></DialogDescription>
                </DialogHeader>
                <div>
                    <Input 
                    onChange={e => searchContacts(e.target.value)}
                    placeholder="Search contacts" 
                    className="rounded-lg p-6 bg-[#2c2e3b] border-none"/>
                </div>
                {searchedContacts.length > 0 && (
                    <ScrollArea className="max-h-[250px]">
                            <div className="flex flex-col gap-5">
                                {
                                    searchedContacts.map((contact: ContactTypes) => (
                                    <div 
                                    onClick={() => selectNewContact(contact)}
                                    key={contact._id}
                                    className="flex gap-3 items-center cursor-pointer"
                                    >
                                        <div className="w-12 h-12 relative">
                                            <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                                            {contact?.image ? 
                                            <AvatarImage src={`${HOST}/${contact?.image}`} 
                                            alt="profile" 
                                            className="object-cover w-full h-full bg-black rounded-full"
                                            /> : (
                                                <div className={`uppercase h-12 w-12 md:w-12 md:h-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(contact?.color)}`}>
                                                   {contact?.firstName ? contact?.firstName.charAt(0) : contact?.email?.charAt(0)}
                                                </div>
                                            )}
                                            </Avatar>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>{contact?.firstName && contact?.lastName ? `${contact?.firstName} ${contact?.lastName}` : contact?.email}</span>
                                            <span className="text-xs">{contact?.email}</span>
                                        </div>
                                    </div>
                                    ))}
                            </div>
                    </ScrollArea>
                    )}
                {searchedContacts.length <= 0 && (
                        <div className="flex-1 md:flex mt-5 md:mt-0 flex-col justify-center items-center hidden duration-1000 transition-all">
                        <Lottie
                        isClickToPauseDisabled={true}
                        height={100}
                        width={100}
                        options={animationDefaultOptions}
                        />
                        <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                            <h3 className="poppins-medium">
                                <span className="text-blue-300">Search new </span> Contact.
                            </h3>
                        </div>
                    </div>
                    )}
            </DialogContent>
        </Dialog>
    </>
  )
}

export default NewDM;