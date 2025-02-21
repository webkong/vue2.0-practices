/**
 * Created by wangsw on 26/02/2017.
 */
export function formatDate (date, formatString) {
  if (/(y+)/.test(formatString)) {
    formatString = formatString.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let key in o) {
    if (new RegExp(`(${key})`).test(formatString)) {
      let str = o[key] + '';
      formatString = formatString.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return formatString;
}

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
}
