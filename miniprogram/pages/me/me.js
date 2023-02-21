const app = getApp()
// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    userInfo: {}
  },
  gotoLogin(){
    let {
      isLogin
    } = this.data
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
  gotoSettings() {
    if (!this.data.isLogin) {
      this.gotoLogin()
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
    if (!this.data.isLogin) {
      this.gotoLogin()
      return
    }
    wx.navigateTo({
      url: '/pages/userConfig/userConfig',
      fail: err => {
        console.log(err);
      }
    })
  },
  chooseAvatar(e){
    console.log(e);
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
      userInfo
    } = app.globalData
    this.setData({
      isLogin: isLogin,
      userInfo: userInfo
    })

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