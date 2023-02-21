const getPhoneNumber = require('./getPhoneNumber/index')
const getOpenId = require('./getOpenId/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'getPhoneNumber':
      return await getPhoneNumber.main(event, context);
    case 'getOpenId':
      return await getOpenId.main(event, context);
  }
};