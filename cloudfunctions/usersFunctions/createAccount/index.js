const cloud = require('wx-server-sdk')
const crypto = require('crypto');

const SECRET_KEY = ';lkjl,mnb'

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

function md5(passwd) {
  let md5 = crypto.createHash('md5')
  return md5.update(passwd).digest('hex')
}

exports.main = async (event, context) => {

  const wxContext = cloud.getWXContext()
  let {
    OPENID
  } = wxContext
  const existUser = await db.collection('users').where({
    '_openid': OPENID
  }).get()
  if (existUser.data.length) {
    return {
      status: 'fail',
      msg: '用户已存在',
    }
  }
  let {
    passwd,
    phoneNumber
  } = event
  passwdMD5 = md5(passwd)
  await db.collection('users').add({
    data: {
      _openid: OPENID,
      phoneNumber: phoneNumber,
      passwdMD5: passwdMD5,
      avatarid: '',
      nickname: '微信用户',
      gender: '保密',
    }
  });
  user =  await db.collection('users').where({
    '_openid': OPENID
  }).get()
  return {status:'success',user:user.data[0]}
}