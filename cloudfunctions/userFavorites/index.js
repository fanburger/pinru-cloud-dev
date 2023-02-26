const clickFavorite = require('./clickFavorite/index')
const selectFavorite = require('./selectFavorite/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'clickFavorite':
      return await clickFavorite.main(event, context);
    case 'selectFavorites':
      return await selectFavorite.main(event, context);
    default:
      return {
        success: false,
        msg: 'The function was not found!'
      }
  }
}