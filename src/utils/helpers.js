// Function to format date
export function formatDate(date) {
  const dateToFormat = new Date(date.seconds * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[dateToFormat.getMonth()];
  const day = String(dateToFormat.getDate()).padStart(2, "0");
  const year = dateToFormat.getFullYear();
  let hours = dateToFormat.getHours();
  const minutes = String(dateToFormat.getMinutes()).padStart(2, "0");
  const seconds = String(dateToFormat.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const strTime = hours + ":" + minutes + " " + ampm;
  return month + " " + day + " " + year + " " + strTime;
}
