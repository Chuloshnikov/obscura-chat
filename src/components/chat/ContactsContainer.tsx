import obscura from "@/assets/obscura.svg";
import Title from "./Title";

const ContactsContainer = () => {
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
            </div>
        </div>
        <div className="my-5">
            <div className="flex items-center justify-between px-10">
                <Title text="Channels"/>
            </div>
        </div>
    </div>
  )
}

export default ContactsContainer;