const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database().collection('address')

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()
  let {
    receiver,
    phoneNumber,
    address,
    remark
  } = event
  try {
    await db.add({
      data: {
        _openid: OPENID,
        receiver,
        phoneNumber,
        address,
        remark
      }
    })
    return {
      success: true,
      msg: 'ok'
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      msg: 'fail'
    }
  }
}