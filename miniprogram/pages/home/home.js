import {
  titleImageHome
} from '../../fileID'
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: []
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
    wx.showLoading({
      title: '',
    })
    wx.cloud.callFunction({
      name: 'goodsFunctions',
      data: {
        name: 'selectGoods'
      }
    }).then(res => {
      for (const goods of res.result.data) {
        goods.titleImage = `${titleImageHome}${goods._id}.png`
      }     
      this.setData({
        goodsList:res.result.data
      })
    }).catch(err=>{
      wx.showToast({
        title: '加载出错',
        icon:'error'
      })
    }).finally(res=>{
      wx.hideLoading()
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