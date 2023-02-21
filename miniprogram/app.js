// app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        traceUser: true,
      });
    }
    wx.getStorage({
      key: 'userInfo',
      success: res => {
        this.globalData.userInfo = res.data
        this.globalData.isLogin = true
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  globalData: {
    userInfo: {},
    isLogin: false
  }
});