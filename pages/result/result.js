const API = require('../../utils/api.js')
const {
  SHAREINFO
} = require('../../utils/const.js')
const {
  drawing,
  drawingPic
} = require('../../utils/ekChart.js')
const {
  evaluateData
} = require('../../utils/quesData.js')
const {
  testList,
  adData
} = require('../../utils/quesData.js')

const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    showOtherTest: false,
    imgurl: '',
    canvasPicHidden: false,
    //1: 答题后进入，2: 查看进入
    pageType: 1,
    bfb: '100',
    evaluateData: evaluateData,
    resultName: ['语言', '逻辑', '视觉', '身体', '音乐', '人际交往', '自我认知', '自我观察'],
    result: [0, 0, 0, 0, 0, 0, 0, 0],
    maxIndex: 0,
    testItem: {},
    lockImg: 'http://image.317hu.com/FiTdIbr4OMKPAFtuhm0yykOHUKHR?imageView2/2/w/700/q/100/interlace/1',
    unLockImg: 'http://image.317hu.com/FrDSFAt2ll5edFR3kiFAHZkL2GZH?imageView2/2/w/700/q/100/interlace/1',
    listData: testList
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var result = options.scoreStr;

    if (result) {
      result = result.split(',')
      this.saveScore(result);
      this.drawingImg(result);
    } else {
      API.questionnaire.getNaireDetail({
        userId: app.globalData.userId,
        id: 1
      }, (res) => {
        if (res.success && res.data) {
          var data = res.data;
          result = [data.language, data.logic, data.vision, data.body, data.music, data.interpersonal, data.observation, data.cognition];
        } else {
          result = [0, 0, 0, 0, 0, 0, 0, 0]
        }
        this.drawingImg(result);
      })
    }
  },

  drawingImg: function(result) {
    var maxIndex = 0;
    this.setData({
      maxIndex
    })
    for (var i = 0; i < result.length; i++) {
      parseInt(result[i]) > parseInt(result[maxIndex]) ? maxIndex = i : null;
    }
    var showOtherTest = false;
    var testItem = {};
    var maxScore = parseInt(result[maxIndex]);
    if (maxIndex == 2 || maxIndex == 4) {
      showOtherTest = true;
      testItem = this.data.listData[maxIndex == 2 ? 1 : 2];
    }
    console.log(0 <= maxScore && maxScore < 10)
    var bfb = 100;
    if (0 <= maxScore && maxScore < 10) {
      bfb = 8;
    } else if (10 <= maxScore && maxScore < 20) {
      bfb = 17;
    } else if (20 <= maxScore && maxScore < 30) {
      bfb = 29;
    } else if (30 <= maxScore && maxScore < 40) {
      bfb = 36;
    } else if (40 <= maxScore && maxScore < 50) {
      bfb = 58;
    } else if (50 <= maxScore && maxScore < 60) {
      bfb = 69;
    } else if (70 <= maxScore && maxScore < 80) {
      bfb = 78;
    } else if (80 <= maxScore && maxScore < 90) {
      bfb = 88;
    } else if (90 <= maxScore && maxScore < 100) {
      bfb = 97;
    } else {
      bfb = 100;
    }
    this.setData({
      result: result,
      maxIndex: maxIndex,
      bfb,
      showOtherTest,
      testItem
    });
    var config = {
      maxIndex: maxIndex,
      categoriesNum: result,
      bfb: bfb
    }
    drawing('canvas', this, config);
    drawingPic('canvasPic', this, config);
    // API.account.getQRCode({
    //   path: '/pages/index/index'
    // }, res => {
    //   this.setData({
    //     imgurl: res.data
    //   })
    //   drawingPic('canvasPic', this, config, res.data);
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var ykUserInfo = app.globalData.ykUserInfo;
    var listData = this.data.listData;
    var reportList = ykUserInfo.questionnaires.split(';');
    // reportList.map(item => {
    //   if (item) {
    //     listData[parseInt(item) - 1].status = 1;
    //   }
    // })
  },

  //保存分数
  saveScore: function(result) {
    var userInfo = app.globalData.userInfo;
    API.questionnaire.commit({
      name: '综合问卷', //问卷名
      accountId: app.globalData.userId, //提交人id
      questionnaireId: 1, //问卷id
      city: userInfo.city, //城市
      province: userInfo.province, //省份
      language: result[0], //语言天赋得分
      logic: result[1], //逻辑得分
      vision: result[2], //视觉得分
      body: result[3], //身体得分
      music: result[4], //音乐得分
      interpersonal: result[5], //人际得分
      cognition: result[6], //自我认识得分
      observation: result[7], //观察得分
      //attributes: 12,//答案 json string
    }, (res) => {
      console.log(res);
      if (res.success) {
        //提交了分数之后需要刷新首页数据
        app.globalData.refreshIndex = true;
      }
    });
  },

  savePic: function() {
    var self = this;
    this.setData({
      canvasPicHidden: false
    }, () => {
      wx.canvasToTempFilePath({
        // x: 0,
        // y: 0,
        // width: 370,
        // height: 750,
        // destWidth: 370,
        // destHeight: 750,
        canvasId: 'canvasPic',
        success: function(res) {
          console.log(res.tempFilePath);
          var tempFilePath = res.tempFilePath;
          wx.getSetting({
            success(res) {
              console.log(res);
              if (!res.authSetting['scope.writePhotosAlbum']) {
                wx.authorize({
                  scope: 'scope.writePhotosAlbum',
                  success() {
                    console.log('授权成功');
                    self.saveImageByWx(tempFilePath);
                  }
                })
              } else {
                self.saveImageByWx(tempFilePath);
              }
            }
          })
        },
        fail: function(res) {
          console.log(res)
        }
      }, self)
    });
  },

  saveImageByWx: function(tempFilePath) {
    var self = this;
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      fail(res) {
        console.log(res);
      },
      success(res) {
        wx.showModal({
          content: '图片已保存到相册，赶紧晒一下吧~',
          showCancel: false,
          confirmText: '好的',
          confirmColor: '#333',
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定');
              /* 该隐藏的隐藏 */
              self.setData({
                canvasPicHidden: true
              })
            }
          }
        })
      }
    })
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
    return SHAREINFO;
  }
})