const createHistory = require('./createHistory/index')
const deleteHistory = require('./deleteHistory/index')
const selectHistory = require('./selectHistory/index')

// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.name) {
    case 'createHistory':
      return await createHistory.main(event, context);
    case 'deleteHistory':
      return await deleteHistory.main(event, context);
    case 'selectHistory':
      return await selectHistory.main(event, context);
    default:
      return {
        success: false,
          msg: 'The function was not found!',
          data: null
      }
  }
}