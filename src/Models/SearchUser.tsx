export interface SearchUserProps {
  hideSearchPopUp: any
  searchType?: string
}

export interface UserListProps {
  setActiveUser: any
  activeUser: UserTrimedData
}

export interface UserTrimedData {
  name: string
  active: boolean | number
  email: string
  id: string
  profileUrl: string
  groups: any
}
