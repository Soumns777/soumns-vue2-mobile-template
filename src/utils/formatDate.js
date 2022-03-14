/**
 * 转换日期格式  YYYY-MM-DD
 */
function formatDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

/**
 * 转换日期格式  YYYY-MM-DD hh:mm:ss
 */
function formatCompleteDate(date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
}

/**
 * 两个日期之间相差天数
 */
function getDaysBetween(dateString1, dateString2) {
  var startDate = Date.parse(dateString1)
  var endDate = Date.parse(dateString2)
  if (startDate > endDate) {
    return 0
  }
  if (startDate == endDate) {
    return 1
  }
  var days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000) + 1
  return Number(days)
}

export { formatDate, formatCompleteDate, getDaysBetween }
