import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { Route } from "../Models/SideBarModels";

const sideBarNavigation: Array<Route> = [
    {
        name: "Personal Chats",
        icon: faCommentAlt,
        path: "#personalChats"
    },
    {
        name: "Group Chats",
        icon: faUsers,
        path: "#groupChats"
    }
];

export { sideBarNavigation };