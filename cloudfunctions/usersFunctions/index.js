const getPhoneNumber = require('./getPhoneNumber/index')
const getOpenId = require('./getOpenId/index')
const createAccount = require('./createAccount/index')
const quickLogin = require('./quickLoginByOpenid/index')
const phoneLogin = require('./phoneLogin/index')

exports.main = async (event, context) => {
  switch (event.name) {
    case 'getPhoneNumber':
      return await getPhoneNumber.main(event, context);
    case 'getOpenId':
      return await getOpenId.main(event, context);
    case 'createAccount':
      return await createAccount.main(event, context);
    case 'quickLogin':
      return await quickLogin.main(event, context);
    case 'phoneLogin':
      return await phoneLogin.main(event, context);
    default:
      return {
        code: 1, msg: 'This function was not found!'
      }
  }
};