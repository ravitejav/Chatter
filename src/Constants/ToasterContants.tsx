import { toasterType } from '../Models/ToasterModel'

export const TOAST_CONSTANT = {
  message: '',
  type: 'NON',
  showToast: false,
}
export const ERROR_CONSTANT = (message: string) => ({
  message,
  type: 'ERROR' as toasterType,
  showToast: true,
})
export const SUCCESS_CONSTANT = (message: string) => ({
  message,
  type: 'SUCCESS' as toasterType,
  showToast: true,
})
export const WARNING_CONSTANT = (message: string) => ({
  message,
  type: 'WARNING' as toasterType,
  showToast: true,
})
export const INFO_CONSTANT = (message: string) => ({
  message,
  type: 'NON' as toasterType,
  showToast: true,
})

export const INVALID_DETAILS = 'Invalid Username or Password'
export const AUTH_ERROR = "Username and Password didn't match, please check"
export const AUTH_SUCCESS = 'Successfully Loggedin'
export const VERIFY_YOUR_MAIL = 'Please verify your mailID.'
export const SIGNUP_ERROR = 'Failed to Signup, something went wrong'
export const SIGNUP_SUCCESS = 'Successfully signed up!!!, please verify your mail'
export const GOOGLE_AUTH_ERROR = 'Something went wrong'
export const INVALID_NAME = 'Name must have 8 letters'
export const FAILED_TO_UPDATE = 'Failed to update data, please try again later!!!'
export const MINIMUM_CHARS = 'Please eneter atleast 3 letters to search!'
export const FRIEND_REQ_SENT = (name: string) => `Your request is sent to the ${name}`
export const FAILED_TO_SEND_REQ = (name: string) => `Failed to send your request to the ${name}`
export const USER_IS_ADDED = 'Added to user list!!'
export const REMOVED_FROM_REQUEST_LIST = 'Request is removed!!'
