# oss-upload

OSS 上传工具。

将本地的目录和文件同步到 OSS。

## 使用方法

安装：

```sh
npm install --save-dev @wings-j/oss-upload
```

运行函数：

```js
import ossUpload from '@wings-j/oss-upload'

ossUpload({
  region: 'oss-cn-hangzhou',
  accessKeyId: '权限凭证ID',
  accessKeySecret: '权限凭证密钥',
  bucket: '仓库命',
  remoteBase: '远程基地址（可为空）',
  localBase: '本地基地址'
})
```
