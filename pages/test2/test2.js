// pages/test2/test2.js
const { SHAREINFO } = require('../../utils/const.js')
const { quesData2 } = require('../../utils/quesData.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkIcon:'http://image.317hu.com/Fi_geMIf820WfCFaS6QDtH9uKtY7',
    currentQues: 0,
    chooseAnsLength: 0,
    quesData: quesData2,
    score: 0,
    ansArr: [],
  },

  chooseAns: function (event) {
    var self = this;
    var score = this.data.score;
    var ansArr = this.data.ansArr;
    var currScore = event.currentTarget.dataset.score;
    var answer = event.currentTarget.dataset.answer;
    var index = event.currentTarget.dataset.index;
    if (ansArr[index]){
      return;
    }
    score = score + parseInt(currScore);
    ansArr[index] = answer;
    this.setData({ ansArr, score});
    if (this.data.currentQues < this.data.quesData.length-1) {
      setTimeout(function () {
        self.setData({
          currentQues: self.data.currentQues + 1
        })
      }, 500)
    }else{
      this.submitTest(score);
    }
  },

  submitTest: function (score) {
    wx.showToast({
      title: '天赋解码中',
      icon: 'loading',
      duration: 1000
    });
    setTimeout(function () {
      wx.navigateTo({
        url: '/pages/result/result2/result2?score=' + score
      })
    }, 1000)
  },
  onShareAppMessage: function () {
    return SHAREINFO;
  },
  previewImage: function (event){
    var imageUrl = event.currentTarget.dataset.imageurl;
    wx.previewImage({
      current: imageUrl, // 当前显示图片的http链接
      urls: [imageUrl]
    })
  }
})