export default function formatResumeFilename(
  firstName: string,
  lastName: string,
  type: string
) {
  const typesArray = type.split("_");
  return `CV ${
    typesArray[1]
  } - ${firstName} ${lastName}.${typesArray[0].toLowerCase()}`;
}
