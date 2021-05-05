/**
 * @name index
 */

/* private */

const Path = require('path')
const Resource = require('./module/resource')
const Oss = require('./module/oss')
const Message = require('./util/message')
const FixPath = require('./util/fix-path')

/* public */

/**
 * @name 运行
 * @param {Object} config 配置。{region, accessKeyId, accessKeySecret, bucket, remoteBase, localBase, excludes}
 */
function run(config) {
  if (!Path.isAbsolute(config.localBase)) {
    config.localBase = FixPath(Path.resolve(process.cwd(), config.localBase))
  }

  Oss.initiate(config)

  Message.info('Start scanning')

  Resource.scan(config)
    .then(directory => {
      Message.info(`${directory.length} files scanned`)
      Message.info('Start uploading')

      return Oss.upload(config, directory)
    })
    .then(() => {
      Message.info('Finish')
    })
}

/* construct */

module.exports = run
