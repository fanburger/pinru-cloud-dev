const getPhoneNumber = require('./getPhoneNumber/index')
const getOpenId = require('./getOpenId/index')
const createAccount = require('./createAccount/index')
const quickLogin = require('./quickLoginByOpenid/index')
const phoneLogin = require('./phoneLogin/index')
const updateAvatar = require('./updateAvatar/index')
const updateGender = require('./updateGender/index')
const updateNickname = require('./updateNickname/index')

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
    case 'updateAvatar':
      return await updateAvatar.main(event, context);
    case 'updateGender':
      return await updateGender.main(event, context);
    case 'updateNickname':
      return await updateNickname.main(event, context);
    default:
      return {
        success: false, msg: 'This function was not found!'
      }
  }
};