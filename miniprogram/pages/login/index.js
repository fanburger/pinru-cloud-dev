import {
  bgLogo
} from '../../fileID'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPath: bgLogo,
    isLoginMode: true
  },
  switchLogin() {
    this.setData({
      isLoginMode: !this.data.isLoginMode
    })
  },
  quickLogin() {

  },
  getPhoneNumber(e) {
    // 目前个人开发者小程序无法获取手机号
    let {
      code
    } = e.detail
    if (!code) {
      wx.showToast({
        title: '暂不支持',
        icon: 'error'
      })
      return
    }

    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'getPhoneNumber',
        code: code
      }
    }).then(res => {
      console.log(res);
      wx.hideLoading()
    }).catch(res => {
      console.log(res);
      wx.showToast({
        title: '请手动输入',
        icon: 'error'
      })
      wx.hideLoading()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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