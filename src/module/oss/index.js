/**
 * @name oss
 * @export Object
 */

/* private */

const Fs = require('fs').promises
const Oss = require('ali-oss')
const Md5 = require('md5-nodejs')
const Message = require('../../util/message')

let client = null

/**
 * @name 获取远端Etag
 * @param {String} path 路径
 * @return {String} md5
 */
async function getRemoteEtag(path) {
  try {
    let data = await client.getObjectMeta(path)
    if (data.status === 200) {
      return data.res.headers.etag.replace(/"/g, '').toLowerCase()
    } else {
      return null
    }
  } catch (er) {
    switch (er.message) {
      case 'Object not exists':
        break
      default:
        Message.error(er.message)
        console.trace()
        break
    }

    return null
  }
}
/**
 * @name 获取本地Etag
 * @param {String} file 文件内容
 * @return {String} md5
 */
function getLocalEtag(file) {
  return Md5(file)
}

/* public */

/**
 * @name 初始化
 * @param {Object} config 配置。{region, accessKeyId, accessKeySecret, bucket}
 */
function initiate(config) {
  client = Oss({
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket
  })
  client.useBucket(config.bucket)
}

/**
 * @name 上传
 * @param {Object} config 配置。{remoteBase, localBase}
 * @param {Array} directory 路径数组
 */
async function upload(config, directory) {
  let total = directory.length
  let finished = 0

  let promises = []
  try {
    for (let el of directory) {
      let file = await Fs.readFile(el)
      let targetPath = el.replace(config.localBase, config.remoteBase)

      let etag = await getRemoteEtag(targetPath)
      if (etag && etag === getLocalEtag(file)) {
        Message.info(`Skipped [${++finished}/${total}] "${targetPath}"`)
      } else {
        let then = client.put(targetPath, Buffer.from(file)).then(() => {
          Message.info(`Uploaded [${++finished}/${total}] "${targetPath}".`)
        })

        promises.push(then)
      }

      await Promise.all(promises)
    }
  } catch (er) {
    Message.error(er)
    console.trace()
  }
}

/* construct */

module.exports = { initiate, upload }
