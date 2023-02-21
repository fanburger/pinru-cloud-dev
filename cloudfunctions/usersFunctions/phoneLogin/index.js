const cloud = require('wx-server-sdk')
const md5 = require('../utils/md5')

const userDB = cloud.database().collection('users')

exports.main = async (event, context) => {
  let {
    phoneNumber,
    passwd
  } = event
  let {
    passwdMD5
  } = md5.md5(passwd)
  let wxContext = cloud.getWXContext()
  let {
    OPENID
  } = wxContext
  let user = await userDB.where({
    _openid: OPENID,
    phoneNumber: phoneNumber,
    passwdMD5: passwdMD5
  }).get()
  console.log(user);
  if (!user.data.length) {
    return {
      status: 'fail',
      msg: '登录错误'
    }
  }
  return {
    status: 'success',
    user: user.data[0]
  }
}