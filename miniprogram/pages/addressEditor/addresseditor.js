// pages/addressEditor/addresseditor.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: null,
    receiver: '',
    phoneNumber: '',
    address: '',
    remark: ''
  },
  submitAddress() {
    let {
      _id,receiver,phoneNumber,address,remark
    } = this.data
    console.log(this.data);
    let funcName = _id ? 'updateAddress' : 'createAddress'
    wx.showLoading({
      title: ''
    })
    wx.cloud.callFunction({
      name: 'addressFunctions',
      data: {
        name: funcName,
        _id,
        receiver,
        phoneNumber,
        address,
        remark
      }
    }).then(res => {
      if (res.result.success) {
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
        setTimeout(() => {
          wx.navigateBack()
        }, 1500);
      }else{
        console.log(res);
      }
    }).catch(err => {
      wx.showToast({
        title: '失败',
        icon: 'error'
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let {
      _id
    } = options
    if (_id) {
      this.setData({
        _id: _id
      })
      wx.cloud.callFunction({
        name: 'addressFunctions',
        data: {
          name: 'selectAddressByID',
          _id: _id
        }
      }).then(res => {
        let {
          address,
          phoneNumber,
          receiver,
          remark
        } = res.result
        this.setData({
          address,
          phoneNumber,
          receiver,
          remark
        })
      })
    }
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