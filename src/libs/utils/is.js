const toString = Object.prototype.toString

/**
 * @description: 判断值是否未某个类型
 */
export function is(val, type) {
  return toString.call(val) === `[object ${type}]`
}

/**
 * @description:  是否为函数
 */
export function isFunction(val) {
  return is(val, 'Function')
}

/**
 * @description: 是否为对象
 */
export const isObject = (val) => {
  return val !== null && is(val, 'Object')
}
