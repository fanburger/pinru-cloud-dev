// pages/addressManager/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressList: []
  },
  gotoCreateAddress() {
    wx.navigateTo({
      url: '/pages/addressEditor/addresseditor'
    })
  },
  gotoEditAddress(e) {
    let {
      id: _id
    } = e.currentTarget.dataset
    wx.navigateTo({
      url: '/pages/addressEditor/addresseditor?_id=' + _id
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
    wx.showLoading({
      title: '加载中'
    })
    wx.cloud.callFunction({
      name: 'addressFunctions',
      data: {
        name: 'selectAddress'
      }
    }).then(res => {
      this.setData({
        addressList: res.result.data
      })
      wx.hideLoading()
    }).catch(err => {
      console.log(err);
      wx.showToast({
        title: '出错了',
        icon: 'error'
      })
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