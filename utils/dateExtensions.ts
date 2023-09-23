import moment from "moment";

export default function formatDateHumanReadable(date: Date | string): string {
  return moment(date).format("MMMM D, YYYY");
}