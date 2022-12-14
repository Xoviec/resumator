import { format, differenceInYears } from "date-fns";
import firebase from "firebase/compat/app";
import { LooseObject } from "../types/LooseObject";

type DateOrTimestamp = Date | firebase.firestore.Timestamp;

/**
 * Checks if key is a common datetime key that needs formatting
 * @param {string} key
 * @returns {boolean}
 */
function isDateKey(key: string): boolean {
  const dateKeys = ["startDate", "endDate", "dateOfBirth"];
  return dateKeys.includes(key);
}

function isISODateString(timestamp: string): boolean {
  const ISODateRegex =
    /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/gm;
  return ISODateRegex.test(timestamp);
}

export function castDate(
  timestamp: string | DateOrTimestamp | undefined
): Date | undefined {
  return timestamp && typeof timestamp === "object" && "seconds" in timestamp
    ? (new Date(timestamp.seconds * 1000) as Date)
    : (timestamp as Date | undefined);
}

export function formatDate(
  timestamp: DateOrTimestamp | string | undefined,
  dateformat = "dd-MM-yyyy"
): string | undefined {
  if (!timestamp) return;

  if (typeof timestamp === "object") {
    return format(castDate(timestamp) as Date, dateformat) as string;
  }

  if (typeof timestamp === "string" && isISODateString(timestamp)) {
    const dateFromTimestamp: Date = new Date(timestamp);

    return format(dateFromTimestamp, dateformat) as string;
  }

  return timestamp;
}

/**
 * Cast all Firestore Timestamps to Javascript Dates inside an object
 * @see https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
 *
 * @param {*} object
 * @returns
 */
export function castDatesInObject(object: LooseObject): LooseObject {
  return walkObject(object, castDate);
}

/**
 * Format all dates
 *
 * @param {*} object
 * @returns
 */
export function formatDatesInObject(
  object: LooseObject,
  format = "yyyy-MM-dd"
): LooseObject {
  return walkObject(object, (prop: string | DateOrTimestamp | undefined) =>
    formatDate(prop, format)
  );
}

function walkObject(
  object: LooseObject,
  callback: (prop: string | DateOrTimestamp | undefined) => void
): LooseObject {
  for (const key in object) {
    const prop = object[key];

    if (prop && typeof prop === "object") {
      if (prop.seconds || prop instanceof Date) {
        object[key] = callback(prop);
      } else {
        object[key] = walkObject(prop, callback);
      }
    }

    if (isDateKey(key) && prop && typeof prop === "string") {
      object[key] = callback(prop);
    }
  }
  return object;
}

export const yearsAndMonthString = (totalMonths: number): string => {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  let str = "";
  if (years === 1) str += `${years} year`;
  if (years > 1) str += `${years} years`;
  if (years && months) str += ` and `;
  if (months === 1) str += `${months} month`;
  if (months > 1) str += `${months} months`;

  return str;
};

export function formatTimespan({
  startDate,
  endDate,
  showEndYear = false,
  dateFormat = "dd-MM-yyyy",
}: {
  startDate?: Date;
  endDate?: Date;
  showEndYear?: boolean;
  dateFormat?: string;
}): string {
  if (startDate && endDate)
    return `${formatDate(startDate, dateFormat)} - ${formatDate(
      endDate,
      dateFormat
    )}`;

  if (startDate && !endDate) return `${formatDate(startDate, dateFormat)} - present`;

  if (!startDate && endDate)
    return showEndYear
      ? `Ended in ${formatDate(endDate, "yyyy")}`
      : `somewhere in the past - ${formatDate(endDate, dateFormat)}`;

  return "";
}
/**
 * Set the year for current date and month
 * @param year year to be set
 * @returns date
 */
export function setYear(year: number): number {
  return new Date().setFullYear(year);
}
/**
 * Get current full year
 * @returns current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}

export const calculateAge = (dob: string | Date): number => {
  const date = new Date(dob);
  const age = differenceInYears(new Date(), date);
  return age;
};
