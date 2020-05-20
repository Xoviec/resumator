import { format } from "date-fns";

export const getFormattedDate = (date) => {
  if (date) {
    if (date.seconds) {
      return format(new Date(date.seconds), "yyyy-MM-dd");
    } else {
      return format(new Date(date.toString()), "yyyy-MM-dd");
    }
  }
};
