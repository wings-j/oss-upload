/**
 * @name 资源
 * @export Object
 */

/* private */

const Path = require('path')
const Fs = require('fs').promises
const Message = require('../../util/message')
const FixPath = require('../../util/fix-path')

/**
 * @name 迭代
 * @param {String} path 路径
 * @param {Array} result 结果容器
 * @param {Array} excludes 排除
 */
async function iterate(path, result, excludes) {
  Message.info(`Scanned ${path}`)

  for (let a of excludes) {
    if (a.test(path)) {
      Message.info(`Excluded ${path}`)

      return
    }
  }

  if ((await Fs.stat(path)).isDirectory()) {
    let subNames = await Fs.readdir(path)
    for (let el of subNames) {
      let subPath = FixPath(Path.resolve(path, el))

      await iterate(subPath, result, excludes)
    }
  } else {
    result.push(path)
  }
}

/* public */

/**
 * @name 扫描
 * @param {String} config 配置
 * @return {Object} 目录
 */
async function scan(config) {
  let path = config.localBase
  let excludes = config.excludes || []

  try {
    let directory = []
    await iterate(path, directory, excludes)

    return directory
  } catch (er) {
    Message.error(er)
    console.trace()
  }
}

/* construct */

module.exports = { scan }
