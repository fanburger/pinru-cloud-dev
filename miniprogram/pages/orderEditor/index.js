import {
  titleImageHome
} from '../../fileID'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    goods: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      _id
    } = options
    this.setData({
      _id: _id
    })
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
    let {
      _id
    } = this.data
    wx.cloud.callFunction({
      name: 'goodsFunctions',
      data: {
        name: 'detail',
        _id: _id
      }
    }).then(res => {
      let {
        status,
        msg,
        goods
      } = res.result
      if (status == 'fail') {
        wx.showToast({
          title: msg,
          icon: 'error'
        })
      }
      if (status == 'success') {
        goods.titleImage = `${titleImageHome}${_id}.png`
        this.setData({
          goods: goods
        })
      }
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