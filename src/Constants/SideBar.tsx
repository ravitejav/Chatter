import { faCogs, faUserPlus, faUsers, faCommentDots, faBell } from '@fortawesome/free-solid-svg-icons'
import { Route } from '../Models/SideBarModels'

const sideBarNavigation: Route[] = [
  {
    name: 'Personal Chats',
    icon: faCommentDots,
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
  {
    name: 'Notifications',
    icon: faBell,
    path: '/Chatter/Notifications',
  },
  {
    name: 'Settings',
    icon: faCogs,
    path: '/Chatter/Settings',
  },
]

export { sideBarNavigation }
