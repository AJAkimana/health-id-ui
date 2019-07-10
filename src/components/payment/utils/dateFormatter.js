const dateFormatter = (date) => {
  const currentDate = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${currentDate}/${month + 1}/${year} \u00A0\u00A0 ${hours} : ${minutes} ${ampm}`;
};

export default dateFormatter;
