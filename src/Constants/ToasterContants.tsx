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
export const SUCCESS_CONSTANT = (message: string) => ({
    message: message,
    type: "SUCCESS" as toasterType,
    showToast: true
});
export const WARNING_CONSTANT = (message: string) => ({
    message: message,
    type: "WARNING" as toasterType,
    showToast: true
});

export const INVALID_DETAILS = "Invalid Username or Password";
export const AUTH_ERROR = "Username and Password didn't match, please check";
export const AUTH_SUCCESS = "Successfully Loggedin";
export const VERIFY_YOUR_MAIL = "Please verify your mailID.";
export const SIGNUP_ERROR = "Failed to Signup, something went wrong";
export const SIGNUP_SUCCESS = "Successfully signed up!!!, please verify your mail";
