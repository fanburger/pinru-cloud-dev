const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database().collection('address')

exports.main = async (event, context) => {
  let {
    _id
  } = event;
  let address = await db.where({
    _id: _id
  }).get()
  return address.data[0]
}