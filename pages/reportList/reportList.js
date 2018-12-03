// pages/reportList/reportList.js
const API = require('../../utils/api.js')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lockImg: 'http://image.317hu.com/FiTdIbr4OMKPAFtuhm0yykOHUKHR?imageView2/2/w/700/q/100/interlace/1',
    unLockImg: 'http://image.317hu.com/FrDSFAt2ll5edFR3kiFAHZkL2GZH?imageView2/2/w/700/q/100/interlace/1',
    listData: [{
        id: 1,
        name: '综合测试',
      bgImg: 'http://image.317hu.com/Frb36jsfXwdMOmmXqLoRyWzFQwMz?imageView2/2/w/700/q/100/interlace/1',
        status: 2, //1解锁，2未解锁
        link: '/pages/result/result'
      }, {
        id: 2,
        name: '视觉专项测试',
        bgImg: 'http://image.317hu.com/Foo34pWc9FQxoANqcTXjtdZgSZZ2?imageView2/2/w/700/q/100/interlace/1',
        status: 2, //1解锁，2未解锁
        link: '/pages/result/result2/result2'
      }, {
        id: 3,
        name: '音乐专项测试',
        bgImg: 'http://image.317hu.com/Fv0VT3mDmzkhY9ioI9CYOnaX4hcN?imageView2/2/w/700/q/100/interlace/1',
        status: 2, //1解锁，2未解锁
        link: '/pages/result/result3/result3'
      }, {
        id: 4,
        name: '逻辑专项测试',
        bgImg: 'http://image.317hu.com/Fi7ryMTEC-TUbCuaOD272IwmjwB3?imageView2/2/w/700/q/100/interlace/1',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      },
      {
        id: 5,
        name: '语言专项测试',
        bgImg: 'http://image.317hu.com/Fk5wWmv8fsYzGhV0RpzS3nfSBHut?imageView2/2/w/700/q/100/interlace/1',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      },
      {
        id: 6,
        name: '人际专项测试',
        bgImg: 'http://image.317hu.com/FmlDF40YQd_9TrQLohjZIpYXc6rN?imageView2/2/w/700/q/100/interlace/1',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      },
      {
        id: 7,
        name: '身体专项测试',
        bgImg: 'http://image.317hu.com/FvCufLnLzzvaYaruuPVEPOXuROLQ?imageView2/2/w/700/q/100/interlace/1',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      },
      {
        id: 8,
        name: '自我观察专项测试',
        bgImg: 'http://image.317hu.com/Fu6Y_m2TuhS_J2WEjUgMzCSqc8qp?imageView2/2/w/700/q/100/interlace/1',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      },
      {
        id: 9,
        name: '自我认识专项测试',
        bgImg: 'http://image.317hu.com/FohaovjAQFAYlx294oTkcT_2ODfb',
        status: 2,
        link: '/pages/testIntro/testIntro?id=5'
      }
    ],
    noAnswer: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    API.account.getAccountById({
      accountId: app.globalData.userId
    }, (res) => {
      if (res.success) {
        if (res.data.answered) {
          var listData = this.data.listData;
          var reportList = res.data.answered.split(';');
          reportList.map(item => {
            if (item) {
              listData[parseInt(item) - 1].status = 1;
            }
          })
          this.setData({
            listData,
            noAnswer: false
          });
        }
      }
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