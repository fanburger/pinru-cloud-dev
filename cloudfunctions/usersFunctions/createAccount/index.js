const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    OPENID
  } = wxContext
  const existUser = await db.collection('users').where({
    '_openid': OPENID
  }).get()
  if (!existUser.length) {
    return {
      status: 'fail',
      msg: '用户已存在'
    }
  }

  // 以后需要对密码加密存储
}