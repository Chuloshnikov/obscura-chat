import { toast } from "sonner";

export const useAuthValidation = () => {
    const validateEmail = (email: string) => {
        if (!email.length) {
            toast.error("Email is required.");
            return false;
        }
        return true;
    };

    const validatePassword = (password: string) => {
        if (!password.length) {
            toast.error("Password is required.");
            return false;
        }
        return true;
    };

    const validateSignUp = (email: string, password: string, confirmPassword: string) => {
        if (!validateEmail(email) || !validatePassword(password)) return false;
        if (password !== confirmPassword) {
            toast.error("Password and confirm password should be the same");
            return false;
        }
        return true;
    };

    const validateLogin = (email: string, password: string) => {
        return validateEmail(email) && validatePassword(password);
    };

    return { validateLogin, validateSignUp };
};