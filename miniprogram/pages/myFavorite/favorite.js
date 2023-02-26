import {
  titleImageHome
} from '../../fileID'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorites: []
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
    wx.cloud.callFunction({
      name: 'userFavorites',
      data: {
        name: 'selectFavorites'
      }
    }).then(res => {
      let {
        favorites,
        success
      } = res.result
      if (success) {
        let _favorites = []
        for (const fa of favorites) {
          fa.titleImage = `${titleImageHome}${fa._id}.png`
          _favorites.push(fa)
        }
        this.setData({
          favorites: _favorites
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