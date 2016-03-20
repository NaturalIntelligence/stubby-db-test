

exports.formatDate = function(dt,format){
  format = format.replace('yyyy', dt.getFullYear());
  format = format.replace('dd', exports.pad(dt.getDate(),2));
  format = format.replace('mm', exports.pad(dt.getMonth()+1,2));
  return format;
}

exports.pad = function(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}