//app.js
const API = require('./utils/api.js')
const { appId } = require('./utils/const.js')
const { saveUserInfo } = require('./utils/publicFun.js')

App({
  onLaunch: function () {
    var self = this;

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code; //返回code
        API.account.getOpenId({
          code: code
        }, (res) => {
          if (res.success) {
            var openId = res.data.openid;
            console.log('openId=>' + openId)
            self.globalData.openId = openId;
            
            if (self.globalData.userInfo &&  self.getYKUserInfoSucc) {
              saveUserInfo(self);
            }
            //  else {
            //   self.userInfoReadyCallback = (res) => {
            //     saveUserInfo(self, res.userInfo);
            //   }
            // }
          }
        })
      }
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          self.globalData.authSettingOk = true;
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              if (self.globalData.openId) {
                saveUserInfo(self, self.globalData.userInfo);
              }
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              if (this.indexUserInfoReadyCallback) {
                this.indexUserInfoReadyCallback(res)
              }
            },
            fail: res => {
              console.log(res);
            }
          })
        }else{
          self.globalData.authSettingOk = true;
          if (this.indexUserInfoReadyCallback) {
            this.indexUserInfoReadyCallback({})
          }
        }
      }
    })
  },
  globalData: {
    authSettingOk: false, // 授权是否完成
    userInfo: null,
    openId: '',
    userId: '',
    ykUserInfo: null,
    refreshIndex: false,
  }
})