import moment from 'moment'

export const timeAgo = (timestamp: number) => {
  return timestamp ? moment(new Date(timestamp)).fromNow() : null;
}
