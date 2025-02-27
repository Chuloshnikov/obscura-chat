import { useNavigate } from "react-router-dom";
import { getColor } from "../../lib/utils";
import { useAppStore } from "../../store";
import { HOST } from "../../utils/constants";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { FiEdit2 } from "react-icons/fi";
import { IoPowerSharp } from "react-icons/io5";

const ProfileInfo = () => {
    const { userInfo } = useAppStore();
    const navigate = useNavigate();

    const logOut = async () => {

    }
  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
        <div className="flex gap-3 items-center justify-center">
            <div className="w-12 h-12 relative">
                <Avatar className="h-12 w-12 rounded-full overflow-hidden">
                {userInfo?.image ? 
                <AvatarImage src={`${HOST}/${userInfo?.image}`} 
                alt="profile" 
                className="object-cover w-full h-full bg-black"
                /> : (
                    <div className={`uppercase h-32 w-32 md:w-48 md:h-48 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(userInfo?.color)}`}>
                        {userInfo?.firstName ? userInfo?.firstName?.split("").shift()  : userInfo?.email.split("").shift()}
                    </div>
                )}
                </Avatar>
            </div>
            <div>
                {userInfo?.firstName && userInfo?.lastName ? `${userInfo?.firstName} ${userInfo?.lastName}` : ""}
            </div>
        </div>
        <div className="flex gap-5">
        <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiEdit2 
                            onClick={() => navigate("/profile")}
                            className="text-neutral-500 text-xl font-medium"
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                                Edit Profile
                        </TooltipContent>
                    </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <IoPowerSharp
                            onClick={logOut}
                            className="text-red-500 text-xl font-medium"
                            />
                        </TooltipTrigger>
                        <TooltipContent className="bg-[#1c1b1e] border-none text-white">
                            Logout
                        </TooltipContent>
                    </Tooltip>
        </TooltipProvider>
        </div>
    </div>
  )
}


export default ProfileInfo;