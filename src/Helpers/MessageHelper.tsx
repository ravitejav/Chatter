import firebase from 'firebase'

export const getCountOfLatestMessages = (
  lastTime: string | number,
  messages: firebase.database.DataSnapshot
) => {
  const lastReadTimeStamp = parseInt(lastTime as string, 10)
  const AllMessages = messages.val()
  let count = 0
  Object.keys(AllMessages).forEach((messageKey: string) => {
    if (AllMessages[messageKey].timestamp > lastReadTimeStamp) {
      count++
    }
  })
  return count
}
