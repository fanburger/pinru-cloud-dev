const crypto = require('crypto')

exports.md5 = function md5(passwd) {
  let md5 = crypto.createHash('md5')
  return md5.update(passwd).digest('hex')
}