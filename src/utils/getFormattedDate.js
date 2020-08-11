import { format } from "date-fns";

export const getFormattedDate = (date, dateFormat = "yyyy-MM-dd") => {
  if (date) {
    if (date.seconds) {
      return format(new Date(date.seconds * 1000), dateFormat);
    } else {
      return format(new Date(date.toString()), dateFormat);
    }
  }
};
