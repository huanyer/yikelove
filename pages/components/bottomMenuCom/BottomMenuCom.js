// pages/bottomMenuCom/bottomMenuCom.js
const app = getApp()
const { saveUserInfo } = require('../../../utils/publicFun.js')
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    selectTab: {
      type: String,
      value: '1',//1：我的测评 2:测评报告
    }
  },
  data: {
    // 这里是一些组件内部数据
    myTestImg: 'http://image.317hu.com/FqzRDNllj-gYfRnVI6UKUUZV0SfE?imageView2/2/w/700/q/100/interlace/1',
    myTestImgActive: 'http://image.317hu.com/FlKf5-c9VET95iCBWoM1ykIIToPk?imageView2/2/w/700/q/100/interlace/1',
    reportListImg: 'http://image.317hu.com/FuXEvJz6M1x5dwglDb_EeBWAioh3?imageView2/2/w/700/q/100/interlace/1',
    reportListImgActive: 'http://image.317hu.com/Fu-dTdn321qRjMdL7n3WpWYdWFgz?imageView2/2/w/700/q/100/interlace/1'
  },
  methods: {
    // 这里是一个自定义方法
    switchTab: function (event) {
      this.triggerEvent('switchtab', event.currentTarget.dataset.tab);
    },

    getUserInfo: function (e) {
      var userInfo = e.detail.userInfo;
      if (!app.globalData.userInfo) {
        app.globalData.userInfo = userInfo;
        //将用户信息保存起来
        saveUserInfo(app, userInfo, (res) => {
          console.log(res)
        })
      }
    }
  }
})