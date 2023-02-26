const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const favoriteDB = cloud.database().collection('favorites')

exports.main = async (event, context) => {
  let {
    OPENID
  } = cloud.getWXContext()
  let {
    goodsID
  } = event

  try {
    let favorite = await favoriteDB.where({
      _openid: OPENID,
      goodsID
    }).get()
    let status = false
    if (favorite.data.length) {
      status = favorite.data[0].isFavorite
    }
    return {
      success: true,
      msg: 'ok',
      isFavorite: status
    }
  } catch (error) {
    return {
      success: false,
      msg: error
    }
  }
}