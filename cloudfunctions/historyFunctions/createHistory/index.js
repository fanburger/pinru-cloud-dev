const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const historyDB = cloud.database().collection('history')
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
  let {
    goodsID
  } = event
  let history = await historyDB.where({
    _openid: OPENID
  }).get()
  if (history.data.length == 0) {
    // 如果没有找到该用户就添加一条记录
    await historyDB.add({
      data: {
        _openid: OPENID,
        history: [goodsID]
      }
    })
    return successRsp
  } else {
    let rec = history.data[0]
    if (!rec.history.includes(goodsID)) {
      await historyDB.where({
        _openid: OPENID
      }).update({
        data: {
          history: _.push(goodsID)
        }
      })
    }
    return successRsp
  }
}