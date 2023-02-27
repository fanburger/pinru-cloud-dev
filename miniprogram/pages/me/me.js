const app = getApp()
// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {},
    avatar: ''
  },
  gotoSettings() {
    app.gotoLogin()
    if (!this.data.isLogin) {
      return
    }
    wx.navigateTo({
      url: '/pages/userSettings/userSettings',
      fail: err => {
        console.log(err);
      }
    })
  },
  gotoMyConfig() {
    app.gotoLogin()
    if (!this.data.isLogin) {
      return
    }
    wx.navigateTo({
      url: '/pages/userConfig/userConfig',
      fail: err => {
        console.log(err);
      }
    })
  },
  gotoAddressManager() {
    app.gotoLogin()
    if (!this.data.isLogin) {
      return
    }
    wx.navigateTo({
      url: '/pages/addressManager/address'
    })
  },
  gotoChat(e) {
    app.gotoLogin()
    if (!this.data.isLogin) {
      return
    }
  },
  gotoMyFavorite() {
    wx.navigateTo({
      url: '/pages/myFavorite/favorite'
    })
  },
  gotoHistory() {
    wx.navigateTo({
      url: '/pages/history/history'
    })
  },
  gotoCoupous() {
    wx.navigateTo({
      url: '/pages/coupous/coupous'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let {
      isLogin,
      userInfo,
    } = app.globalData
    this.setData({
      isLogin: isLogin,
      userInfo: userInfo
    })
    if (this.data.isLogin) {
      this.setData({
        avatar: userInfo.avatarCloudUrl
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})