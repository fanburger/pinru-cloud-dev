const selectAddress = require('./selectAddress/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'selectAddress':
      return await selectAddress.main(event, context);
    default:
      break;
  }
}