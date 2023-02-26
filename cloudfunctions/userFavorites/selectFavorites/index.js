const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const favoriteDB = cloud.database().collection('favorites')
const goodsDB = cloud.database().collection('goods')
const _ = cloud.database().command

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()

  try {
    let goodsID = []
    let favorite = await favoriteDB.where({
      _openid: OPENID
    }).get()
    for (const fa of favorite.data) {
      if (fa.isFavorite) {
        goodsID.push(fa.goodsID)
      }
    }
    let favoriteGoods = await goodsDB.where({
      _id: _.in(goodsID)
    }).get()

    return {
      success: true,
      msg: 'ok',
      favorites: favoriteGoods.data
    }
  } catch (error) {
    return {
      success: false,
      msg: error
    }
  }
}