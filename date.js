module.exports.getDate = function() {
  const date = new Date();
  year = date.getFullYear();
  month = date.getMonth()
  day = date.getDate();

  return {year: year, month: month, day: day};
}

module.exports.getTime = function () {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return [hours, minutes, seconds];
}

module.exports.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
