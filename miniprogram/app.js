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
        wx.showToast({
          title: '尚未登陆',
          icon:'error'
        })
      }
    })
  },
  globalData: {
    userInfo: {},
    isLogin: false
  },
  gotoLogin(){
    let {
      isLogin
    } = this.globalData
    if (!isLogin) {
      wx.showModal({
        title: '尚未登陆',
        content: '是否前往登录页',
        complete: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/index',
            })
          }
        }
      })
      return
    }
  },
});