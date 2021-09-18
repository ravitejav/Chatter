import { faCogs, faUserPlus, faUsers, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import { Route } from '../Models/SideBarModels'

const sideBarNavigation = (currentUser: any): Route[] => [
  {
    name: 'Personal Chats',
    icon: faCommentDots,
    path: '/Chatter/chat',
  },
  {
    name: 'Group Chats',
    icon: faUsers,
    path: '/Chatter/groupChat',
  },
  {
    name: 'Friend Request',
    additonalData: currentUser ? Object.keys(currentUser.requests || {}).length : null,
    icon: faUserPlus,
    path: '/Chatter/friendRequests',
  },
  {
    name: 'Profile',
    icon: faCogs,
    path: '/Chatter/profile',
  },
]

export { sideBarNavigation }
