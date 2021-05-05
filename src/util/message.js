/**
 * @name 消息
 */

/* public */

/**
 * @name 通知
 * @param {String} text 文本
 */
function info(...texts) {
  console.log('Info '.white.bgBrightCyan, ...texts)
}
/**
 * @name 错误
 * @param {String} text 文本
 */
function error(...texts) {
  console.log('Error'.white.bgBrightRed, ...texts)
}

/* construct */

require('colors')

module.exports = { info, error }
