/**
 * Compare Strings
 * @param First string you want to compare
 * @param Second string you want to compare with the first string
 * @returns {boolean} returns if the string are identical
 */
export const compareStrings = (string: string, _string: string): boolean => {
  return string.trim().toLowerCase() === _string.trim().toLowerCase();
};
