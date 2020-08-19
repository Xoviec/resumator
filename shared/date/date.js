const { format } = require("date-fns");

function castDate(timestamp) {
  return timestamp && timestamp.seconds
    ? new Date(timestamp.seconds * 1000)
    : timestamp;
}

function formatDate(timestamp, dateformat = "yyyy-MM-dd") {
  return timestamp ? format(castDate(timestamp), dateformat) : timestamp;
}

/**
 * Cast all Firestore Timestamps to Javascript Dates inside an object
 * @see https://firebase.google.com/docs/reference/js/firebase.firestore.Timestamp
 *
 * @param {*} object
 * @returns
 */
function castDatesInObject(object) {
  return walkObject(object, castDate);
}

/**
 * Format all dates
 *
 * @param {*} object
 * @returns
 */
function formatDatesInObject(object, format = "yyyy-MM-dd") {
  return walkObject(object, prop => formatDate(prop, format));
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

module.exports = {
  castDate,
  formatDate,
  castDatesInObject,
  formatDatesInObject,
}
