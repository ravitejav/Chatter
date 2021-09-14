export const verifyImage = (e: any, setProfiePicName: any, id = 'profilePic') => {
  if (e.target.validity.valid) {
    const fileSize = (document.getElementById(id) as HTMLInputElement)?.files?.item(0)?.size || 0
    if (fileSize / 1024 > 1024 || fileSize === 0) {
      return false
    } else {
      setProfiePicName(e.target.value.split('\\').pop())
      return true
    }
  }
}
