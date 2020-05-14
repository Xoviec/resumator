import { format } from "date-fns";

export const getFormattedDate = (date) => {
  if (date.seconds) {
    return format(new Date(date.seconds), "yyyy-MM-dd");
  } else {
    return date;
  }
};
