// pages/testIntro/testIntro.js
const app = getApp()
const { saveUserInfo } = require('../../utils/publicFun.js')
const { SHAREINFO } = require('../../utils/const.js')
const API = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultHearImg: 'http://image.317hu.com/FvM5ToJaMroEnbaP2_BJ1hMrDO_y?imageView2/2/w/700/q/100/interlace/1',
    ques2Unlock: false
  },

  getUserInfo: function (e) {
    console.log('getUserInfo')
    var userInfo = e.detail.userInfo;
    if (!app.globalData.userInfo) {
      app.globalData.userInfo = userInfo;
      //将用户信息保存起来
      saveUserInfo(app, userInfo, (res) => {
        console.log(res)
      })
    } else {
      wx.navigateTo({
        url: "/pages/test/test"
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id || 2;
    this.setData({ id: id });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var questionnaires = app.globalData.ykUserInfo.questionnaires;
    if(questionnaires.indexOf('2')!=-1){
      this.setData({ques2Unlock: true})
    }
  },
  buyTest: function () {
    var self = this;
    // API.account.payMoneyForNaire({
    //   id: 2,openId: app.globalData.openId
    // },(res)=>{
    //   wx.requestPayment(
    //     {
    //       'timeStamp': res.data.timeStamp,
    //       'nonceStr': res.data.nonceStr,
    //       'package': res.data.package,
    //       'signType': 'MD5',
    //       'paySign': res.data.paySign,
    //       'success': function (res) { 
    //         self.setData({ ques2Unlock:true});
    //         //买了课程之后需要刷新首页数据
    //         app.globalData.refreshIndex = true;
    //       },
    //       'fail': function (res) {console.log(res) },
    //       'complete': function (res) { }
    //     })
    // })
    // API.account.buyQuestionnaireById({
    //   accountId: app.globalData.ykUserInfo.id,
    //   questionnaireId: 2
    // }, (res) => {

    // })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return SHAREINFO;
  }
})