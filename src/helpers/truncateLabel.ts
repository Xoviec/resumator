const MAX_LENGTH = 12;

export const truncateLabel = (content: string): string => {
  if (content.length < MAX_LENGTH) return content;
  return `${content.substr(0, MAX_LENGTH)}...`;
};
