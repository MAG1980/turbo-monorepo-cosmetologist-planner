export const convertToMilliseconds = (timeString: string | undefined) => {
  if (!timeString) {
    throw new Error('Time string is not defined');
  }

  if (!isNaN(timeString as any)) {
    return parseInt(timeString);
  }

  const lastSymbol = timeString.slice(-1);

  let multiplier = 1;

  switch (lastSymbol) {
    case 's':
      multiplier = 1000;
      break;
    case 'm':
      multiplier = 60 * 1000;
      break;
    case 'h':
      multiplier = 60 * 60 * 1000;
      break;
    case 'd':
      multiplier = 24 * 60 * 60 * 1000;
      break;
    case 'M':
      multiplier = 30 * 24 * 60 * 60 * 1000;
      break;
    case 'y':
      multiplier = 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error('Time string is not valid');
  }

  return parseInt(timeString) * multiplier;
};
