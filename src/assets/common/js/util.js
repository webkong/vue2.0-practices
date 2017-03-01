/**
 * Created by wangsw on 01/03/2017.
 * 解析url参数
 * @example ?id=123123&a=111&b=12322
 * @return Object {id:1223123, a:111,b:12322}
 */
export function urlParse () {
  let url = window.location.search;
  let obj = {};
  let arr = url.match(/[?&][^?&]+=[^?&]+/g);
  // ['?id=123123','&a=111','&b=12322']
  if (arr) {
    arr.forEach((item) => {
      let tempArr = item.substring(1).split('=');
      let key = decodeURIComponent(tempArr[0]);
      let value = decodeURIComponent(tempArr[1]);
      obj[key] = value;
    });
  }
  return obj;
}
