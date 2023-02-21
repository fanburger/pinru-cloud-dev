const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database()
const userDB = db.collection('users')

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {
    OPENID
  } = wxContext;

  let user = await userDB.where({
    _openid: OPENID
  }).get()

  if (!user.data.length) {
    return {
      status: 'fail',
      msg: '尚未注册'
    }
  }

  return {
    status: 'success',
    user: user.data[0]
  }
}