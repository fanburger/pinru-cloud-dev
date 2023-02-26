const selectAddress = require('./selectAddress/index')
const selectAddressByID = require('./selectAddressByID/index')
const updateAddress = require('./updateAddress/index')
const createAddress = require('./createAddress/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'selectAddress':
      return await selectAddress.main(event, context);
    case 'selectAddressByID':
      return await selectAddressByID.main(event, context);
    case 'updateAddress':
      return await updateAddress.main(event, context);
    case 'createAddress':
      return await createAddress.main(event, context);
    default:
      break;
  }
}