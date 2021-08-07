import { toasterType } from "../Models/ToasterModel"

export const TOAST_CONSTANT = {
    message: "",
    type: "NON",
    showToast: false,
}
export const ERROR_CONSTANT = (message: string) => ({
    message: message,
    type: "ERROR" as toasterType,
    showToast: true
}); 

export const AUTH_ERROR = "Invalid Username and Password, please check";