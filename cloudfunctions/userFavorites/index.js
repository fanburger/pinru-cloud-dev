const clickFavorite = require('./clickFavorite/index')
const selectFavoriteByID = require('./selectFavoriteByID/index')
const selectFavorites = require('./selectFavorites/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'clickFavorite':
      return await clickFavorite.main(event, context);
    case 'selectFavoriteByID':
      return await selectFavoriteByID.main(event, context);
    case 'selectFavorites':
      return await selectFavorites.main(event, context);
    default:
      return {
        success: false,
          msg: 'The function was not found!'
      }
  }
}