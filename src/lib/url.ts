export const isValidUrl = (url: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/.test(
    url
  );
};

export const getDomain = (url: string): string => {
  const matches = url.match(
    // eslint-disable-next-line no-useless-escape
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im
  );

  const domain = matches && matches[1];
  const domainParts = domain?.split(".");

  return domainParts?.slice(-2).join(".") || "";
};
