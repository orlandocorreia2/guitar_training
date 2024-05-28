export const ConvertSecondsInHour = (seconds) => {
  if (seconds === 0) return "00:00:00";
  const hour = parseInt(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const min = parseInt((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const sec = parseInt((seconds % 3600) % 60)
    .toString()
    .padStart(2, "0");
  return `${hour}:${min}:${sec}`;
};
