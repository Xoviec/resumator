import { formatDate } from "../lib";

export const convertSecondsToDateTimeString = (seconds?: number) => {
  const date = new Date(seconds ?? 0);
  const time = date.toLocaleTimeString("nl-NL", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = formatDate(date);
  return `${formattedDate} @ ${time}`;
};
