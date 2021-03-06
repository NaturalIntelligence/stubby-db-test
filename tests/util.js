
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

var Days = [
  "Sunday", "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday", "Saturday"
];

exports.formatDate = function(dt,format){
  format = format.replace('yyyy', dt.getFullYear());
  format = format.replace('YYYY', dt.getFullYear());
  format = format.replace('yy', (dt.getFullYear()+"").substring(2));
  format = format.replace('YY', (dt.getFullYear()+"").substring(2));
  format = format.replace('MMMM', monthNames[dt.getMonth()]);
  format = format.replace('MMM', monthNames[dt.getMonth()].substring(0,3));
  format = format.replace('MM', exports.pad(dt.getMonth()+1,2));
  format = format.replace('M', dt.getMonth()+1);
  format = format.replace('dd', exports.pad(dt.getDate(),2));
  format = format.replace('d', dt.getDate());
  format = format.replace('DD', Days[dt.getDay()]);
  format = format.replace('D', Days[dt.getDay()].substring(0,3));
  format = format.replace('HH', exports.pad(dt.getHours(),2));
  format = format.replace('H', dt.getHours());
  format = format.replace('mm', exports.pad(dt.getMinutes(),2));
  format = format.replace('m', dt.getMinutes());
  format = format.replace('ss', exports.pad(dt.getSeconds(),2));
  format = format.replace('s', dt.getSeconds());
  format = format.replace(/"/g,'');
  return format;
}

exports.pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}