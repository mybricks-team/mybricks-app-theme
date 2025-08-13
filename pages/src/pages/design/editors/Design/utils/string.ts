/** 驼峰转为-连接 */
export function convertCamelToHyphen(str: string) {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/** -连接转为驼峰 */
export function convertHyphenToCamel(str) {
  return str.replace(/-(\w)/g, function (match, group1) {
      return group1.toUpperCase();
  });
}
