const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const addressDB = cloud.database().collection('address')

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()
  let {
    _id
  } = event
  if (!_id) {
    return {
      success: false,
      msg: 'invalid id'
    }
  }
  try {
    await addressDB.where({
      _id,
      _openid: OPENID
    }).remove()
    return {
      success: true,
      msg: 'ok'
    }
  } catch (error) {
    return {
      success: false,
      msg: 'fail'
    }
  }


}