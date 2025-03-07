import obscura from "@/assets/obscura.svg";
import Title from "./Title";
import ProfileInfo from "./ProfileInfo";
import NewDM from "./NewDM";
import { useEffect } from "react";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTES } from "@/utils/constants";
import { useAppStore } from "@/store";
import ContactList from "../ContactList";
import CreateChannel from "../channel/CreateChannel";

const ContactsContainer = () => {

    const { setDirectMessagesContacts, directMessagesContacts } = useAppStore();

    useEffect(() => {
        const getContacts = async () => {
            const response = await apiClient.get(
                GET_DM_CONTACTS_ROUTES, 
                {withCredentials: true}
            );
            if (response.data.contacts) {
                setDirectMessagesContacts(response.data.contacts);
            }
        };

        getContacts();
    }, []);

  return (
    <div className='relative md:w-[35vw] lg:w-[30vw] xl:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full'>
        {/* LOGO start */}
        <div className='flex items-center pt-3 pl-5'>
            <img src={obscura} alt="Logo" className="w-8 h-8 rounded-full bg-white"/>
            <div className="text-black font-bold text-4xl text-white">
                bscura
            </div>
        </div>
        {/* LOGO END */}
        <div className="my-5">
            <div className="flex items-center justify-between px-10">
                <Title text="Direct Messages"/>
                <NewDM/>
            </div>
            <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden">
                <ContactList contacts={directMessagesContacts}/>
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between px-10">
                <Title text="Channels"/>
                <CreateChannel/>
            </div>
        </div>
        <ProfileInfo/>
    </div>
  )
}

export default ContactsContainer;