// pages/test/test.js
const {
  SHAREINFO
} = require('../../utils/const.js')
const {
  quesData1
} = require('../../utils/quesData.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentQues: 0,
    chooseAnsLength: 0,
    quesData: quesData1,
  },
  prveQues: function() {
    if (this.data.currentQues > 0) {
      this.setData({
        currentQues: this.data.currentQues - 1
      })
    }
  },
  nextQues: function() {
    if (this.data.currentQues < this.data.quesData.length - 1) {
      this.setData({
        currentQues: this.data.currentQues + 1
      })
    }
  },
  chooseAns: function(event) {
    var self = this;
    var quesData = this.data.quesData;
    var currentQues = this.data.currentQues;
    var chooseAnsLength = this.data.chooseAnsLength;
    if (quesData[currentQues].chooseAns) {
      return;
    }
    console.log(currentQues);
    if (!quesData[currentQues].chooseAns) {
      chooseAnsLength = chooseAnsLength + 1
    }
    quesData[currentQues].chooseAns = event.currentTarget.dataset.ansIndex;
    this.setData({
      quesData: quesData,
      chooseAnsLength
    })
    setTimeout(function() {
      if (quesData.length == chooseAnsLength) {
        self.submitTest();
      } else {
        self.nextQues();
      }
    }, 500)
  },

  submitTest: function() {
    var quesData = this.data.quesData;
    var chooseAnsLength = this.data.chooseAnsLength;
    if (quesData.length != chooseAnsLength) {
      wx.showModal({
        title: '请将所有问题回答完毕后提交',
        showCancel: false
      })
    } else {
      var quesData = this.data.quesData;
      var scoreArr = [0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < quesData.length; i++) {
        if (0 <= i && i <= 4) {
          scoreArr[0] = scoreArr[0] + quesData[i].chooseAns * 4;
        } else if (i <= 9) {
          scoreArr[1] = scoreArr[1] + quesData[i].chooseAns * 4;
        } else if (i <= 14) {
          scoreArr[2] = scoreArr[2] + quesData[i].chooseAns * 4;
        } else if (i <= 19) {
          scoreArr[3] = scoreArr[3] + quesData[i].chooseAns * 4;
        } else if (i <= 24) {
          scoreArr[4] = scoreArr[4] + quesData[i].chooseAns * 4;
        } else if (i <= 29) {
          scoreArr[5] = scoreArr[5] + quesData[i].chooseAns * 4;
        } else if (i <= 34) {
          scoreArr[6] = scoreArr[6] + quesData[i].chooseAns * 4;
        } else {
          scoreArr[7] = scoreArr[7] + quesData[i].chooseAns * 4;
        }
      }
      wx.showToast({
        title: '天赋解码中',
        icon: 'loading',
        duration: 1000
      });
      setTimeout(function() {
        wx.navigateTo({
          url: '/pages/result/result?scoreStr=' + scoreArr.toString()
        })
      }, 1000)
    }
  },
  onShareAppMessage: function() {
    return SHAREINFO;
  }
})