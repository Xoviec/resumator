export const truncateLabel = (content: string): string => {
  const maxLength = 12;
  if (content.length < maxLength) return content;
  return `${content.substr(0, maxLength)}...`;
};
