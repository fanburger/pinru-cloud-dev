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
    goodsID,
    status
  } = event

  try {
    let favorite = await favoriteDB.where({
      _openid: OPENID,
      goodsID
    }).get()
    if (favorite.data.length) {
      await favoriteDB.where({
        _openid: OPENID,
        goodsID
      }).update({
        data: {
          isFavorite: status
        }
      })
    } else {
      await favoriteDB.add({
        data: {
          _openid: OPENID,
          goodsID,
          isFavorite: status
        }
      })
    }
    return {
      success: true,
      msg: 'ok'
    }
  } catch (error) {
    return {
      success: false,
      msg: error
    }
  }
}