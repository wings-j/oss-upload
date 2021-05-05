/**
 * @name 修复路径
 */

/**
 * @name 修复路径
 * @description 更改路径中的\\为/
 * @param {String} path 路径
 * @return {String} 修复后路径
 */
function fixPath(path) {
  return path.replace(/\\/g, '/')
}

module.exports = fixPath
