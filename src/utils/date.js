import { format } from "date-fns";

export function castDate(timestamp) {
  return timestamp && timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : timestamp;
}

export function formatDate(timestamp, dateformat = "yyyy-MM-dd") {
  return timestamp ? format(castDate(timestamp), dateformat) : timestamp;
}

/**
 * Cast all Firestore Timestamps to Javascript Dates inside an object
 * @see https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
 *
 * @param {*} object
 * @returns
 */
export function castDatesInObject(object) {
  return walkObject(object, castDate);
}

/**
 * Format all dates
 *
 * @param {*} object
 * @returns
 */
export function formatDatesInObject(object, format = "yyyy-MM-dd") {
  return walkObject(object, (prop, format) => formatDate(prop, format));
}

function walkObject(object, callback) {
  for (const key in object) {
    let prop = object[key];
    if (typeof prop === "object") {
      if (prop.seconds || prop instanceof Date) {
        object[key] = callback(prop);
      } else {
        object[key] = walkObject(prop, callback);
      }
    }
  }
  return object;
}
