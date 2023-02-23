const selectGoods = require('./selectGoods/index')
const selectGoodsDetail = require('./selectGoodsDetail/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'selectGoods':
      return await selectGoods.main(event, context);
    case 'detail':
      return await selectGoodsDetail.main(event, context)
  }
};