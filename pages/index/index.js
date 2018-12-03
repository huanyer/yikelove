//index.js
//获取应用实例
const app = getApp()
const API = require('../../utils/api.js')
const { drawing } = require('../../utils/ekChart.js')
const { SHAREINFO } = require('../../utils/const.js')
const { saveUserInfo } = require('../../utils/publicFun.js')
const { testList, adData } = require('../../utils/quesData.js')

Page({
  data: {
    selectTab: '1',
    userInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('view.open-type.getUserInfo'),
    showAuthModal: false, //授权弹框
    change: false,
    testList: testList,
    adData: adData,
  },
  switchTab: function (e) {
    this.setData({
      selectTab: e.detail
    })

  },
  onLoad: function () {
    app.getYKUserInfoSucc = () => {
      console.log('获取亦可用户信息成功')
      this.pageLoad();
    }
    if (!app.globalData.userInfo ) {
      //判断是否已经执行过获取用户信息的接口
      if (app.globalData.authSettingOk){
        this.setData({ showAuthModal: true })
      }else{
        app.indexUserInfoReadyCallback = res => {
          if (res.errMsg != 'getUserInfo:ok') {
            this.setData({ showAuthModal: true })
          }
        }
      }
    }else{
      saveUserInfo(app);
    }
  },

  getUserInfo: function (e) {
    //此处为用户第一次授权
    var userInfo = e.detail.userInfo;
    if (userInfo) {
      //将用户信息保存起来
      app.globalData.userInfo = userInfo;
      //添加用户信息
      if(app.globalData.openId){
        saveUserInfo(app, userInfo);
      }
      this.setData({ userInfo: userInfo, showAuthModal: false });
    }
  },
  //页面数据渲染
  pageLoad: function () {
    var ykUserInfo = app.globalData.ykUserInfo;
    console.log(ykUserInfo);
    var listData = this.data.testList;
    var reportList = ykUserInfo.questionnaires.split(';');
    // reportList.map(item => {
    //   if (item) {
    //     listData[parseInt(item) - 1].status = 1;
    //   }
    // })
    this.setData({ testList: listData });


    API.questionnaire.getNaireDetail({
      userId: app.globalData.userId,
      id: 1
    }, (res) => {
      if (res.success && res.data) {
        var data = res.data;
        var result = [data.language, data.logic, data.vision, data.body, data.music, data.interpersonal, data.observation, data.cognition];
      } else {
        result = [0, 0, 0, 0, 0, 0, 0, 0]
      }
      var maxIndex = 0;
      for (var i = 0; i < result.length; i++) {
        parseInt(result[i]) > parseInt(result[maxIndex]) ? maxIndex = i : null;
      }
      var config = {
        maxIndex: maxIndex,
        categoriesNum: result
      }

      drawing('canvas', this, config);
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    //需要刷新页面数据,由全局变量控制
    console.log('刷新首页数据=>' + app.globalData.refreshIndex)
    if (app.globalData.refreshIndex) {
      this.pageLoad();
      app.globalData.refreshIndex = false;
    }
  },
  onHide: function () {

  },
  onShareAppMessage: function () {
    return SHAREINFO;
  }
})
