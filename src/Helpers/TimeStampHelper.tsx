import moment from "moment";

export const timeAgo = (timestamp: number) => {
    return moment(new Date(timestamp)).fromNow();   
}