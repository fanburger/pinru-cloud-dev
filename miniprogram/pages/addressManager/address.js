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
  deleteAddress(e) {
    let {
      id:_id
    } = e.currentTarget.dataset
    wx.showModal({
      title: '删除地址',
      content: '确定要删除该地址吗？',
      complete: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: 'addressFunctions',
            data: {
              name: 'deleteAddress',
              _id
            }
          }).then(res => {
            let {
              success
            } = res.result
            if (success) {
              wx.showToast({
                title: '删除成功',
                icon: 'success'
              })
              let newAddressList = this.data.addressList.filter(elem => {
                return elem._id != _id
              })
              this.setData({
                addressList: newAddressList
              })
            } else {
              wx.showToast({
                title: '删除失败',
                icon: 'error'
              })

            }
          })
        }
      }
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