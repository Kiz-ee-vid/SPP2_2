import {toast, ToastPosition} from "react-toastify";

export enum ToastReason {
    SUCCESS = "TOAST_REASON_SUCCESS",
    INFO = "TOAST_REASON_INFO",
    WARNING = "TOAST_REASON_WARNING",
    ERROR = "TOAST_REASON_ERROR",
}

export const showToast = (message: string, reason: ToastReason = ToastReason.ERROR, position: ToastPosition = toast.POSITION.BOTTOM_LEFT) => {
    switch (reason) {
        case ToastReason.SUCCESS:
            // toast.success(message, {position});
            break;
        case ToastReason.INFO:
            // toast.info(message, {position});
            break;
        case ToastReason.WARNING:
            // toast.warning(message, {position});
            break;
        case ToastReason.ERROR:
        default:
            // toast.error(message, {position});
    }
};
