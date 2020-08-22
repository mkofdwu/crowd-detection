const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return (
    date.getDate() +
    ' ' +
    MONTHS[date.getMonth() - 1] +
    ' ' +
    date.getFullYear() +
    ', ' +
    hours +
    ':' +
    minutes +
    ' ' +
    ampm
  );
};
