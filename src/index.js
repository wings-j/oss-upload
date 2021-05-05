/**
 * @name index
 */

/* private */

const Resource = require('./module/resource')
const Oss = require('./module/oss')
const Message = require('./util/message')

/* public */

/**
 * @name 运行
 * @param {Object} config 配置。{region, accessKeyId, accessKeySecret, bucket, remoteBase, localBase, excludes}
 */
function run(config) {
  Oss.initiate(config)

  Message.info('Start scanning')

  Resource.scan(config.localBase, config.excludes)
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
