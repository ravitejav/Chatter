import { EMAIL, NAME, PASSWORD } from '../Constants/ValidatorDefaults'

export const Emailvalidator = (email: string) => {
  if (email !== '') {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  return false
}

export const passwordValidator = (password: string) => {
  if (password !== '' && password.length >= 8) {
    return true
  }
  return false
}

export const nameValidator = (name: string) => {
  if (name !== '' && name.length >= 8) {
    return true
  }
  return false
}

export const Validate = (type: string, value: any) => {
  const validators = []

  if (type === EMAIL) {
    validators.push(Emailvalidator(value))
  }
  if (type === PASSWORD) {
    validators.push(passwordValidator(value))
  }
  if (type === NAME) {
    validators.push(nameValidator(value))
  }

  return !validators.some((x) => !x)
}
