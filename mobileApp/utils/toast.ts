import { useToast } from "react-native-toast-notifications";

export const useToastNotification = () => {
  const toast = useToast();
  
  const showToast = (
    message: string,
    options: { type?: "success" | "danger" | "warning" | "normal"; duration?: number } = {}
  ) => {
    toast.show(message, {
      type: options.type || "normal",
      duration: options.duration || 2000,
    });
  };

  return showToast;
};
