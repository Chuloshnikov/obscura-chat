//import Background from "@/assets/login2.png";
import BackgroundObscura from "@/assets/obscura.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { SIGNUP_ROUTE } from "@/utils/constants";

const Auth = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(SIGNUP_ROUTE);
    console.log('API URL:', apiClient.defaults.baseURL + SIGNUP_ROUTE);

    const validateSignUp = () => {
        if (!email.length) {
            toast.error("Email is required.");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required.");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {

    };

    const handleSignUp = async () => {
        if (validateSignUp()) {
            const response = await apiClient.post(SIGNUP_ROUTE, { email, password });
            console.log({response});
        }
    };


  return (
    <div className="h-[100vh] w-[100vw] flex items-center justify-center">
        <div className="h-[80vh] bg-white border-2 border-white 
        text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] 
        lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2">
            <div className="flex flex-col gap-10 items-center justify-center">
                <div className="flex items-center justify-center flex-col">
                    <div className="flex items-center justify-center">
                        <h1 className="text-5xl font-bold md:text-6xl">Welcome!</h1>
                    </div>
                    <p className="font-medium text-center">
                        Join the Obscura, the maxter community personal chat
                    </p>
                </div>
                <div className="flex items-center justify-center w-full w-full">
                    <Tabs className="w-3/4">
                        <TabsList className="bg-transparent rounded-none">
                            <TabsTrigger 
                            value="login"
                            className="data-[state=active]:bg-transparent text-black 
                            text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black
                            data-[state=active]:font-semibold data-[state=active]:border-b-red-700 p-3 transition-all duration-300"
                            >
                                Login
                            </TabsTrigger>
                            <TabsTrigger 
                            value="signup"
                            className="data-[state=active]:bg-transparent text-black 
                            text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black
                            data-[state=active]:font-semibold data-[state=active]:border-b-red-700 p-3 transition-all duration-300"
                            >
                                Signup
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent 
                        className="flex flex-col gap-5 mt-10" 
                        value="login"
                        >
                            <Input 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" 
                            type="email" 
                            className="rounded-full p-6"
                            value={email}
                            />
                            <Input 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" 
                            type="password" 
                            className="rounded-full p-6"
                            value={password}
                            />
                            <Button 
                            onClick={handleLogin}
                            className="rounded-full p-6"
                            >
                                Login
                            </Button>
                        </TabsContent>
                        <TabsContent 
                        className="flex flex-col gap-5 mt-10" 
                        value="signup"
                        >
                            <Input 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email" 
                            type="email" 
                            className="rounded-full p-6"
                            value={email}
                            />
                            <Input 
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password" 
                            type="password" 
                            className="rounded-full p-6"
                            value={password}
                            />
                            <Input 
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="confirm password" 
                            type="password" 
                            className="rounded-full p-6"
                            value={confirmPassword}
                            />
                            <Button 
                            onClick={handleSignUp}
                            className="rounded-full p-6"
                            >
                                Signup
                            </Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center bg-red-900 rounded-r-xl">
                <img src={BackgroundObscura} alt="background login" className="h=[700px]"/>
            </div>
        </div>
    </div>
  )
}

export default Auth;