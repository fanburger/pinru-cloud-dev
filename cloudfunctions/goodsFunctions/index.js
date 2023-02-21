const selectGoods = require('./selectGoods/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'selectGoods':
      return await selectGoods.main(event, context);
  }
};