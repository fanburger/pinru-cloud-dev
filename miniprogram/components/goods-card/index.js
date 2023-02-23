import {
  titleImageHome
} from '../../fileID'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardType: {
      type: String,
      value: "normal"
    },
    goodsInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cardType: "normal",
    goodsInfo: {},
    titleImageLeft: '16rpx',
    elemGap: '32rpx',
    unitPriceLeft: '144rpx',
    checkedBg: 'white',
    selected: false
  },

  lifetimes: {
    attached: function () {
      let {
        cardType
      } = this.data
      if (cardType == 'selector') {
        this.setData({
          titleImageLeft: '-12rpx',
          elemGap: '28rpx',
          unitPriceLeft: '56rpx'
        })
      }
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 跳转到商品详情页
    gotoDetailPage() {
      let {_id} = this.data.goodsInfo
      wx.navigateTo({
        url: '/pages/goodsDetails/details?_id='+_id
      })
    },
    switchSelect() {
      this.setData({
        selected: !this.data.selected,
        checkedBg: this.data.selected ? 'white' : 'rgba(123, 199, 195, 0.2);'
      })
    }
  }

})