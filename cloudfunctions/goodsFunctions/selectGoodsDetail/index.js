const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const goodsDB = cloud.database().collection('goods')

exports.main = async (event, context) => {
  let {
    _id
  } = event
  let goods = await goodsDB.where({
    _id: _id
  }).get()

  if (!goods.data.length) {
    return {
      status: 'fail',
      goods: null,
      msg: '无此商品'
    }
  }

  return {
    status: 'success',
    goods: goods.data[0],
    msg: '查询成功'
  }
}