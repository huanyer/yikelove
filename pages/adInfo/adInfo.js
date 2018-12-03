// pages/adInfo/adInfo.js
const API = require('../../utils/api.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    currentData: {},
    adInfoData: [{
      name: 'SHICHIDA 七田真',
      intro: '七田真国际教育以全脑开发为核心，为孕妈妈、0-8岁幼儿提供专业早教，开办600多所直营教学中心，主要培养孩子的专注力、想象力、图像记忆能力、语言能力、直觉、速听、速读、速算等能力！',
      img: 'http://image.317hu.com/FlhZy7-UhvMmM8Th0l1UZOtEzMPG?imageView2/2/w/700/q/100/interlace/1',
      price: 398
    }, {
      name: '金宝贝早教',
      intro: 'Gymboree金宝贝，源自美国的早教品牌，至今已有40余年历史。在全球开设700余家中心，其中杭州6家。专注于提供0-5岁宝宝家庭的专业早教课程和全方位的育儿服务。始终用心了解孩子,和孩子共同成长。',
      img: 'http://image.317hu.com/FgchpDjkD6nAdxKTNPtJOymXUC9L?imageView2/2/w/700/q/100/interlace/1'
    }, {
      name: '纽约国际儿童俱乐部',
      intro: 'New York City Kids Club起源于美国纽约，是经过 NAEYC (美国幼儿教育协会）认证的儿童早期教育品牌，2012年登陆中国，是国内唯一具有“儿童俱乐部”概念的高品质早期教育机构。',
      img: 'http://image.317hu.com/FhBstThQAM9Si07q5wRarPMnrziH?imageView2/2/w/700/q/100/interlace/1',
      price: 318
    }, {
      name: '瑞思学科英语少儿英语',
      intro: '瑞思学科英语，将美国原版课程引进中国，旨在为3-18岁的幼儿、青少年提供纯正美式英语教育。 在浸入式英语环境中，激发孩子的英语学习兴趣，英语如母语般运用自如。',
      img: 'http://image.317hu.com/FiiIQOMUhSTGiZfQZeSeWHmFrN5-?imageView2/2/w/700/q/100/interlace/1',
      price: 588
    }, {
      name: 'CinoStar新诺国际少儿英语',
      intro: '新诺国际少儿英语源于美国先进的教学理念，是在全面研究中国少儿英语学习现状，以及应该遵循的科学规律的基础上，深入研发的领先国内行业的少儿英语母语化学习体系。',
      img: 'http://image.317hu.com/Fliwla2uuqa0RxjETESf07FSP3KB?imageView2/2/w/700/q/100/interlace/1',
      price: 499
    }, {
      name: '柚米乐儿童教育',
      intro: '柚米乐儿童教育中心为18个月到12岁儿童提供一站式高端教育课程，主打韩国K.MISULO艺术课程，以游戏+体验的方式启发孩子的体能与智力，强化人际沟通能力。用心了解孩子，让孩子在快乐中收获成长。',
      img: 'http://image.317hu.com/Frm6PAPCapI5zvDrLcdVZWA2X4jA?imageView2/2/w/700/q/100/interlace/1',
      price: 436
    }, {
      name: '美国悦宝园早教',
      intro: '来自美国的纯正美式早教品牌，美语早教第一品牌，沿袭了正统的哈佛多元潜能开发理论 ，多元潜能原创课程，全面开发宝宝潜能四大课程体系。丰元国际中心，是悦宝园入驻杭州的第一家分中心。',
      img: 'http://image.317hu.com/FjoBgon2fkPa5758awWa81qt9Y8a?imageView2/2/w/700/q/100/interlace/1',
      price: 299
    }, {
      name: '蕃茄田艺术',
      intro: '蕃茄田艺术，是精中教育集团旗下艺术教育机构。专业提供2-15岁儿童艺术教育课程。透过艺术玩习教学，培育孩子全方位的人格发展。我们认为艺术不仅只是一种表现，不仅是一个画面；',
      img: 'http://image.317hu.com/Fj-Jl38ouQz6TRb6fUfR1TcgUxsz?imageView2/2/w/700/q/100/interlace/1',
      price: 226
    }, {
      name: '创想童年国际教育中心',
      intro: '经过七年的发展，创想童年现已拥有十余家直营早教中心，包括创想童年运河早教中心、创想童年钱江新城早教中心、创想童年三墩早教中心、创想童年萧山早教中心、创想童年运河早教中心，创想童年永旺梦乐城早教中心等。',
      img: 'http://image.317hu.com/Fnt0iZfoMLzwnudugeHWgTAFWCon?imageView2/2/w/700/q/100/interlace/1',
      price: 300
    }, {
      name: '艺乐宝贝早教中心',
      intro: '艺乐宝贝的教育模式来源于欧美教育，是专为1.5—7周岁幼儿设计的早教课程。该课程是国内首创的美术音乐式结合课程，别具特色，旨在开发孩子的想象力和创造力，是富有个性的幼儿艺术教育。创造艺术，创造快乐！',
      img: 'http://image.317hu.com/FsQPlMjYanGri5kq9rqCVcvXK99b?imageView2/2/w/700/q/100/interlace/1',
      price: 336
    }],
    showAddInfoModal: false,
    mobile: '',
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //options.id
    var id = options.id || 0;
    this.setData({
      currentData: this.data.adInfoData[id],
      id: id
    })
  },
  bindNameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },
  bindTelInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  showModal: function() {
    this.setData({
      showAddInfoModal: true
    })
  },
  submit: function() {
    if (!this.data.name || !this.data.mobile) {
      wx.showToast({
        title: '请将您的信息填写完整!',
        icon: 'none'
      })
      return;
    }
    if (this.data.mobile.length != 11){
      wx.showToast({
        title: '请将您的手机号填写正确!',
        icon: 'none'
      })
      return;
    }
    API.feedback.add({
      "accountId": app.globalData.userId,
      "content": this.data.currentData.name,
      "mobile": this.data.mobile,
      "name": this.data.name
    }, res => {
      wx.showToast({
        title: '预约成功!',
        icon: 'success'
      })
    })
    this.setData({
      showAddInfoModal: false
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})