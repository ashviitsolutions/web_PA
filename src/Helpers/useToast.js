import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const useToast = () => {
    const showSuccess = (message, options = {}) => {
        toast.success(message, { position: "top-right", autoClose: 1000, ...options });
    };

    const showError = (message, options = {}) => {
        toast.error(message, { position: "top-right", autoClose: 1000, ...options });
    };

    const showInfo = (message, options = {}) => {
        toast.info(message, { position: "top-right", autoClose: 1000, ...options });
    };

    const showWarning = (message, options = {}) => {
        toast.warning(message, { position: "top-right", autoClose: 1000, ...options });
    };

    return { showSuccess, showError, showInfo, showWarning, ToastContainer };
};

export default useToast;
