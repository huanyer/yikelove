// pages/test3/test3.js
const {
  SHAREINFO
} = require('../../utils/const.js')
const {
  quesData3
} = require('../../utils/quesData.js')
var innerAudioContext = wx.createInnerAudioContext();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stopIcon: "http://image.317hu.com/Fl4eb4t7x4n2oQ4roQklDW_vRXva?imageView2/2/w/700/q/100/interlace/1",
    playIcon: "http://image.317hu.com/FugfuGiAEkI2qTgXh4Tj8tmrEaOz?imageView2/2/w/700/q/100/interlace/1",
    checkIcon: 'http://image.317hu.com/Fi_geMIf820WfCFaS6QDtH9uKtY7',
    currentQues: 0,
    chooseAnsLength: 0,
    quesData: quesData3,
    score: 0,
    ansArr: [],
    audioArr: [
      'http://image.317hu.com/FqW51YD8mJYLU7VPnV4ap8xifsgc',
      'http://image.317hu.com/FqW51YD8mJYLU7VPnV4ap8xifsgc',
      'http://image.317hu.com/FiDnxY3fEPWIhAOkF_FJbUeu3FNI',

      'http://image.317hu.com/FtrWJNxMmp4usmneoHl7qTb0u-JS',
      'http://image.317hu.com/FixkAVR7dRoljG03SDPGRjiTnnHx',
      'http://image.317hu.com/FtrWJNxMmp4usmneoHl7qTb0u-JS',

      'http://image.317hu.com/Fiz-cWUCd8yzcZ6K2vq6sD91y0VL',
      'http://image.317hu.com/FhqNE1jqS18O0i_EQ1JRDt32G6ZA',
      'http://image.317hu.com/Fkw93Rn07q_QdVefE7Pe_NKrSbfs',

      'http://image.317hu.com/FjChkyHdd-KrrSsanD7eePsnkx56',
      'http://image.317hu.com/Fviw0Xco-fHvh6aHBn6DZQKQQsK8',
      'http://image.317hu.com/Ft0ezUnRJud0RqVYGbNtNmTvyf8d',
      'http://image.317hu.com/Fs7SF1eq61zVLr2DtGshBd5gxERz',

      'http://image.317hu.com/FufhdEEnYDt9_SAnyMxw_Gv00D5H',

      'http://image.317hu.com/FvRNaOEQSDZ9YBWjVEDk30EmlInQ'
    ],
    audioStatus: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  },

  playAudio: function(event) {
    let index = event.currentTarget.dataset.index;
    let audioStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (this.data.audioStatus[index] != 0) {
      innerAudioContext.destroy();
      audioStatus[index] = 0;
      this.setData({
        audioStatus
      })
      innerAudioContext = wx.createInnerAudioContext();
      return;
    }
    innerAudioContext.seek(0);
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.audioArr[index];
    audioStatus[index] = 1;
    this.setData({
      audioStatus
    })
    innerAudioContext.onEnded(() => {
      audioStatus[index] = 0;
      this.setData({
        audioStatus
      })
    })

  },

  chooseAns: function(event) {
    let audioStatus = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    innerAudioContext.destroy();
    audioStatus[index] = 0;
    this.setData({
      audioStatus
    })
    innerAudioContext = wx.createInnerAudioContext();


    var self = this;
    var score = this.data.score;
    var ansArr = this.data.ansArr;
    var currScore = event.currentTarget.dataset.score;
    var answer = event.currentTarget.dataset.answer;
    var index = event.currentTarget.dataset.index;

    score = score + parseInt(currScore);
    console.log(score)
    ansArr[index] = answer;
    this.setData({
      ansArr,
      score
    });
    if (this.data.currentQues < this.data.quesData.length - 1) {
      setTimeout(function() {
        self.setData({
          currentQues: self.data.currentQues + 1
        })
      }, 500)
    } else {
      this.submitTest(score);
    }
  },

  submitTest: function(score) {
    if (score == 0) {
      score = 0;
    } else if (score == 1) {
      score = 60;
    } else if (score == 2) {
      score = 75;
    } else if (score == 3) {
      score = 88;
    } else if (score == 4) {
      score = 93;
    } else if (score == 5) {
      score = 96;
    } else if (score == 6) {
      score = 100;
    }
    wx.showToast({
      title: '天赋解码中',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function() {
      wx.navigateTo({
        url: '/pages/result/result3/result3?score=' + score
      })
    }, 1000)
  },
  onShareAppMessage: function() {
    return SHAREINFO;
  },
  previewImage: function(event) {
    var imageUrl = event.currentTarget.dataset.imageurl;
    wx.previewImage({
      current: imageUrl, // 当前显示图片的http链接
      urls: [imageUrl]
    })
  }
})