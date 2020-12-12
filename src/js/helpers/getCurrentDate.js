export function getCurrentDate() {
  const rawDate = new Date();
  const year = rawDate.getFullYear();
  const month = rawDate.getMonth() + 1;
  const day = rawDate.getDate();
  const hours = rawDate.getHours();
  const minutes = rawDate.getMinutes();
  const seconds = rawDate.getSeconds();
  const ms = rawDate.getMilliseconds();
  return `${year}${month}${day}${hours}${minutes}${seconds}${ms}`;
}
