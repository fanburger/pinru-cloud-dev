import {
  swiperImage,
  detailContent
} from '../../fileID'

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _id: '',
    swiperImages: [],
    goods: {},
    content: [],
    isFavorite: false
  },
  checkLogin() {
    app.gotoLogin()
    let {
      isLogin
    } = app.globalData
    if (!isLogin) {
      return false
    }
    return true
  },
  gotoChat(e) {
    if (!this.checkLogin()) {
      return
    }
  },
  gotoCart() {
    if (!this.checkLogin()) {
      return
    }
    wx.showModal({
      title: '前往购物车',
      content: '即将关闭当前页面',
      complete: (res) => {
        if (res.confirm) {
          wx.switchTab({
            url: '/pages/cart/cart',
          })
        }
      }
    })
  },
  placeOrder() {
    if (!this.checkLogin()) {
      return
    }
    let {
      _id
    } = this.data
    wx.navigateTo({
      url: '/pages/orderEditor/index?_id=' + _id
    })
  },
  changeFavoriteStatus() {
    let {
      isFavorite,
      _id
    } = this.data
    wx.cloud.callFunction({
      name: 'userFavorites',
      data: {
        name: 'clickFavorite',
        goodsID: _id,
        status: !isFavorite
      }
    }).then(res => {
      let {
        success
      } = res.result
      if (success) {
        this.setData({
          isFavorite: !isFavorite
        })
      }
    })
  },
  queryFavoriteStatus() {
    let {
      _id
    } = this.data
    wx.cloud.callFunction({
      name: 'userFavorites',
      data: {
        name: 'selectFavoriteByID',
        goodsID: _id
      }
    }).then(res => {
      let {
        success,
        isFavorite
      } = res.result
      if (success) {
        this.setData({
          isFavorite: isFavorite
        })
      }
    })
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
    let {
      _id: goodsID
    } = this.data
    wx.cloud.callFunction({
      name: 'historyFunctions',
      data: {
        name: 'createHistory',
        goodsID
      }
    }).catch(err => {
      console.log('加入浏览记录失败');
    })
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
        let swiper = []
        let content = []
        for (let index = 1; index <= goods.swiperCount; index++) {
          swiper.push(`${swiperImage}${_id}/${index}.png`)
        }
        for (let index = 1; index <= goods.contentCount; index++) {
          content.push(`${detailContent}${_id}/${index}.png`)
        }
        this.setData({
          goods: goods,
          swiperImages: swiper,
          content: content
        })
      }
    })
    this.queryFavoriteStatus()
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