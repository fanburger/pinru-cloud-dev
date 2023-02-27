const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isshow: false,
    genders: ['保密', '男', '女']
  },
  showPop() {
    this.setData({
      isshow: true
    })
  },
  closePop() {
    this.setData({
      isshow: false
    })
  },
  onCancel() {
    console.log('cancel');
  },
  onConfirm(e) {
    let {
      value
    } = e.detail
    let {
      _id
    } = app.globalData.userInfo
    wx.showLoading({
      title: ''
    })
    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'updateGender',
        gender: value,
        _id
      }
    }).then(res => {
      if (res.result.success) {
        this.setData({
          'userInfo.gender': value
        })
        app.globalData.userInfo.gender = value
        let {
          userInfo
        } = app.globalData
        userInfo.gender = value
        wx.setStorageSync('userInfo', userInfo)
        wx.showToast({
          title: '成功',
          icon: 'success'
        })
      } else {
        wx.showToast({
          title: '失败',
          icon: 'error'
        })
      }
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: '出错了...',
        icon: 'error'
      })
    })
    this.closePop()
  },
  changeAvatar(e) {
    let {
      avatarUrl
    } = e.detail
    let {
      _openid,
      _id
    } = app.globalData.userInfo
    wx.cloud.uploadFile({
      cloudPath: `avatar/${_openid}.jpeg`,
      filePath: avatarUrl,
      success: res => {
        this.setData({
          'userInfo.avatarCloudUrl': res.fileID
        })
        let {
          userInfo
        } = app.globalData
        userInfo.avatarCloudUrl = res.fileID
        wx.setStorageSync('userInfo', userInfo)
        wx.cloud.callFunction({
          name: 'usersFunctions',
          data: {
            name: 'updateAvatar',
            avatarCloudUrl: res.fileID,
            _id
          }
        })
      }
    })
  },
  submitNickname(e) {
    let {
      detail: nickname
    } = e
    let {
      _id
    } = app.globalData.userInfo
    wx.showToast({
      title: '更新中',
      icon: 'loading'
    })
    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'updateNickname',
        _id,
        nickname
      },
      success: res => {
        let {
          success
        } = res.result
        if (success) {
          let {userInfo} = app.globalData
          userInfo.nickname = nickname
          wx.setStorageSync('userInfo', userInfo)
          wx.showToast({
            title: '成功',
            icon: 'success'
          })
        } else {
          wx.showToast({
            title: '失败',
            icon: 'error'
          })
        }
      },
      fail: err => {
        console.log(err);
        wx.hideToast()
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
    let {
      userInfo
    } = app.globalData
    this.setData({
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