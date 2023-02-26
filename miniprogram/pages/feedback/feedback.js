// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg:''
  },
  submit(){
    if (this.data.msg.length < 2) {
      wx.showToast({
        title: '内容过短',
        icon:'error'
      })
      return
    }
    wx.showLoading({
      title: ''
    })
    setTimeout(() => {
      wx.showToast({
        title: '提交成功',
        icon:'success'
      })
    }, 1000);
    setTimeout(() => {
      wx.navigateBack()
    }, 2000);
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