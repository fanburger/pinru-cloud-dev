const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database().collection('address')

exports.main = async (event, context) => {
  let {
    _id,
    receiver,
    phoneNumber,
    address,
    remark
  } = event

  try {
    await db.where({
      _id: _id
    }).update({
      data: {
        receiver: receiver,
        phoneNumber: phoneNumber,
        address: address,
        remark: remark
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