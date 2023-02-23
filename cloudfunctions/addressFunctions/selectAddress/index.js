const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const addressDB = cloud.database().collection('address')

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()
  return await addressDB.where({
    _openid: OPENID
  }).get()
}