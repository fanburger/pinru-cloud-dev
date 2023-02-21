import {
  bgLogo
} from '../../fileID'

const db = wx.cloud.database();
const userCollection = db.collection('users');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgPath: bgLogo,
    isLoginMode: true,
    form: {
      phoneNumber: '',
      passwd: '',
      confirmPasswd: ''
    }
  },
  switchLogin() {
    this.setData({
      isLoginMode: !this.data.isLoginMode
    })
  },
  checkInput(type) {
    let {
      phoneNumber,
      passwd,
      confirmPasswd
    } = this.data.form

    if (phoneNumber.length != 11 || !phoneNumber.startsWith('1')) {
      wx.showToast({
        title: '手机号有误',
        icon: 'error'
      })
      return false
    }
    if (passwd.length <= 8) {
      wx.showToast({
        title: '密码太短',
        icon: 'error'
      })
      return false
    }
    if (type.type == 'login') {
      return true
    }
    if (passwd != confirmPasswd) {
      wx.showToast({
        title: '密码不一致',
        icon: 'error'
      })
      return false
    }
    return true
  },
  inputPasswd(e) {
    let {
      value
    } = e.detail
    let {
      type
    } = e.target.dataset
    if (type == 'passwd') {
      this.setData({
        'form.passwd': value
      })
    } else if (type == 'confirmPasswd') {
      this.setData({
        'form.confirmPasswd': value
      })
    }
  },
  inputPhoneNumber(e) {
    let {
      value
    } = e.detail
    this.setData({
      'form.phoneNumber': value
    })
  },
  createAccount() {
    if (!this.checkInput({
        type: 'signup'
      })) {
      return
    }
    let {
      phoneNumber,
      passwd
    } = this.data.form

    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'createAccount',
        phoneNumber: phoneNumber,
        passwd: passwd
      }
    }).then(res => {
      console.log(res);
      let {
        status,
        user,
        msg
      } = res.result
      if (!status) {
        wx.showToast({
          title: '出错了',
          icon: 'error'
        })
      }
      if (status == 'fail') {
        wx.showToast({
          title: msg,
          icon: 'error'
        })
      }
      if (status == 'success') {
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        })
        wx.setStorageSync('userInfo', user)
      }
    }).catch(res => {
      wx.showToast({
        title: '出错了',
        icon: 'error'
      })
      console.log(res);
    })
  },
  quickLogin() {
    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'quickLogin'
      }
    }).then(res => {
      console.log(res);
      let {
        status,
        msg,
        user
      } = res.result
      if (status == 'fail') {
        wx.showToast({
          title: msg,
          icon: 'error'
        })
        this.setData({
          isLoginMode: false
        })
      } else if (status == 'success') {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        wx.setStorageSync('userInfo', user)
      }
    })
  },
  phoneLogin() {
    if (!this.checkInput({
        type: 'login'
      })) {
      return
    }
    wx.showLoading({
      title: '登陆中',
    })
    let {
      phoneNumber,
      passwd
    } = this.data.form
    wx.cloud.callFunction({
      name: 'usersFunctions',
      data: {
        name: 'phoneLogin',
        phoneNumber: phoneNumber,
        passwd: passwd
      }
    }).then(res => {
      let {
        status,
        user,
        msg
      } = res.result
      if (status == 'fail') {
        wx.showToast({
          title: msg,
          icon: 'error'
        })
      }
      if (status == 'success') {
        wx.setStorageSync('userInfo', user)
        wx.showToast({
          title: '登录成功',
        })
      }
      wx.hideLoading()
    }).catch(err => {
      console.log(err);
      wx.hideLoading()
    })
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