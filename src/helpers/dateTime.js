export const formatDate = date => {
  let result = "";
  if (date) {
    const inputDate = new Date(date);
    const currentDate = new Date();
    if (
      inputDate.getDate() === currentDate.getDate() &&
      inputDate.getMonth() === currentDate.getMonth() &&
      inputDate.getFullYear() === currentDate.getFullYear()
    ) {
      result =
        "Today " +
        inputDate.getHours() +
        ":" +
        inputDate.getMinutes() +
        ":" +
        inputDate.getSeconds();
    } else {
      result = inputDate.toLocaleString();
    }
  }
  return result;
};
