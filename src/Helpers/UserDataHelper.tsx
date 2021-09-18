import { uidExtractor } from './CallBackHelper'

export const extractSearchResults = (
  searchText: string,
  searchResults: any,
  currentUserEmail: string
) => {
  Object.keys(searchResults[uidExtractor(currentUserEmail)].friends || {}).forEach(
    (friendId: string) => (searchResults[friendId] = null)
  )
  searchResults[uidExtractor(currentUserEmail)] = null
  return Object.keys(searchResults)
    .map((userId) => {
      if (searchResults[userId]) {
        if (
          searchResults[userId].email.includes(searchText) ||
          searchResults[userId].name.includes(searchText)
        ) {
          return searchResults[userId]
        }
      }
      return null
    })
    .filter((ele) => ele != null)
}

export const jsonToArray = (json: any) => {
  return Object.keys(json)
    .map((jsonKey) => json[jsonKey])
    .filter((jsonValues) => jsonValues)
}

export const trimExtraData = (userObj: any) => {
  const trimedUserData = {} as any
  Object.keys(userObj).forEach((userid) => {
    trimedUserData[userid] = {
      id: userid,
      name: userObj[userid].name,
      active: userObj[userid].active,
      email: userObj[userid].email,
      profileUrl: userObj[userid].profileUrl,
      groups: userObj[userid].groups,
    }
  })
  return trimedUserData
}
