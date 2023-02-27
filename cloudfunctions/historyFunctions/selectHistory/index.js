const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const historyDB = cloud.database().collection('history')
const goodsDB = cloud.database().collection('goods')
const _ = cloud.database().command
const successRsp = {
  success: true,
  msg: 'ok',
  data: null
}

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()

  let history = await historyDB.where({
    _openid: OPENID
  }).get()

  history = history.data[0].history

  let data = await goodsDB.where({
    _id: _.in(history)
  }).get()
  successRsp.data = data.data
  return successRsp
}