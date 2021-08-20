import { faCommentAlt } from '@fortawesome/free-regular-svg-icons'
import { faUserPlus, faUsers } from '@fortawesome/free-solid-svg-icons'
import { Route } from '../Models/SideBarModels'

const sideBarNavigation: Route[] = [
  {
    name: 'Personal Chats',
    icon: faCommentAlt,
    path: '/Chatter/chat',
  },
  {
    name: 'Group Chats',
    icon: faUsers,
    path: '/Chatter/chat',
  },
  {
    name: 'Friend Request',
    icon: faUserPlus,
    path: '/Chatter/friendRequests',
  },
]

export { sideBarNavigation }
