import { toast } from "sonner";

export const useProfileValidation = () => {
    const validateProfile = (firstName: string, lastName: string) => {
        if (!firstName) {
            toast.error("First Name is required");
            return false;
        }
        if (!lastName) {
            toast.error("Last Name is required");
            return false;
        }
        return true;
    };

    return { validateProfile };
};
