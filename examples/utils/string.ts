// 常用字符串utils

/**
 * 是否为绝对路径
 * @param path 路径
 **/
export function isPathAbsolute(path) {
  return /^(?:\/|[a-z]+:\/\/)/.test(path);
}
