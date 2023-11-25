import toast, { Toaster } from "react-hot-toast";


export const useTotast = () => {
    const showToast = (message, options = {}) => {
        toast.dismiss(); // Dismiss any existing toasts
        toast.success(message, {
          duration: options.duration || 2500,
          style: {
            padding: "14px",
            color: "#524FF5",
          },
          iconTheme: {
            primary: "#A1F65E",
            secondary: "#FFFFFF",
          },
        });
      };
    
      return showToast;
    };

export const ToastContainer = () => {
    return <Toaster position="top-center" reverseOrder={true} />;
  };