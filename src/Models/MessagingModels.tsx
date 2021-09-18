import { GroupDetails } from './CreateGroup';
import { UserTrimedData } from './SearchUser'

export interface MessagingProps {
  activeUser?: UserTrimedData
  name?: string
  type?: string
  activeGroup?: GroupDetails
  handleRestGroup?: any
}
