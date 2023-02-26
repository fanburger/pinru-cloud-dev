const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database().collection('users')

exports.main = async (event, context) => {
  let {
    _id,
    gender
  } = event

  try {
    await db.where({
      _id
    }).update({
      data: {
        gender
      }
    })
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