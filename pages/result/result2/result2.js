// pages/result/result2/result2.js
const { adData } = require('../../../utils/quesData.js')
const API = require('../../../utils/api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content:'',
    showScore: 0,
    year: 0,
    percentage: 0,
    adData,
    index: 0,
    title1: '良好',
    content1: '您的孩子在视觉上似乎表现的并不是那么突出，孩子认识颜色是有一个科学的发展规律的：红—黑—白—绿—黄—蓝—紫—灰—棕( 褐色)。父母教宝宝认识颜色时，若按这个顺序去认识颜色将事半功倍。出生三四个月的宝宝对色彩有了感受力。0 ～ 3 个月的宝宝会对鲜艳的色彩、强烈的黑白对比感兴趣，对于这个年龄段的宝宝而言，色彩是有一种难以抗拒的吸引力。随着宝宝视觉系统的发育成熟，到了4 个月左右，宝宝对色彩就有了感受能力，可以通过认识色彩、感知色彩，来享受美的世界。在早期教育中，颜色的教育非常有利于发展宝宝的辨别力、欣赏力、美的感受力，以及想象力、绘画能力。另外，通过辨认颜色让宝宝更容易养成好的观察的能力和习惯。另外记得不要在宝宝面前摆过多花花绿绿的东西，或者一次教他辨认太多种颜色，这样容易造成他视觉疲劳，抑制状态，这对大脑发育是极其不利的。3 岁以前宝宝在进行艺术绘画等创作的时候，家长不必每次提供所有颜色给宝宝用，而是每次提供一至两种颜色，每次都不一样。',
    title2: '出色',
    content2: '您的孩子在色彩敏感度上似乎有着不错的表现。3至4岁是儿童对色彩的敏感期，儿童喜欢认识色彩，儿童对色彩的认识更多地体现在生活中，他（她）们选择玩具的颜色、选择衣服的颜色等等。心里学家表示，那些对色彩有敏锐感觉的儿童在性格上往往表现出热情开朗；对周围世界感受丰富，心健康；对新事物的认识有强烈的渴望，善于交际；有较强的表达能力、观察能力和自控能力。天空的湛蓝，晚霞的艳红，稻田的金黄，草原的葱郁，这些都是大自然最直接的展现。我们在引领孩子去感受这份美的同时，可以把天上的白云，晚霞中的远山，金黄中的幽绿，草丛中的花朵，都悄悄地指给孩子看。让孩子的眼睛慢慢的去发现。',
    title3: '杰出',
    content3: '您的孩子在色彩敏感度上有着比其他同龄人更强烈的感觉。其实孩子的童年记忆大多时候都是对视觉所看到的颜色是印象最深刻的。孩子对于颜色的敏感程度要比大人高出许多，多给孩子一点对颜色的想象的空间，比如说儿童房在装修的时候，我们不要以自己的眼光来约束孩子，孩子有自己的喜好，我们应该根据他们的喜好来决。当然小baby我们建议多选择一些比较鲜艳的色彩物体或者环境给到他（她）们，这样可以促进小baby的视觉发育！',
    title4: '卓越',
    content4: '哇～您的孩子也太棒了吧！如果条件合适的话，尽可能多带孩子看一些合适的艺术展览，让孩子感受色彩在绘画中展示出来的魅力。这些来自生活中的点滴积累远比知道什么是三原色，如何将几个颜色调配出另一种颜色来要重要得多。当上帝把“色彩”这份礼物摆在我们的面前时，能从这份礼物的宝盒中掏出多少彩色的人生，真的需要我们用心地去经营！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var score = options.score;
    if(score){
      this.saveScore(score);
      this.renderPage(score);
    }else{
      API.questionnaire.getNaireDetail({
        userId: app.globalData.userId,
        id: 2
      }, (res) => {
        if (res.success && res.data) {
          var data = res.data;
          score = data.vision;
        } else {
          score = 0;
        }
        this.renderPage(score);
      })
    }
    
  },

  renderPage:function(score){
    this.setData({ score });
    var showScore = 0;
    var year = 50;
    var percentage = 50;
    var title = '';
    var content = '';
    if (14 <= score && score < 22) {
      title = this.data.title1;
      content = this.data.content1;
      showScore = 60;
      year = 50;
      percentage = 50;
    } else if (score < 30) {
      title = this.data.title1;
      content = this.data.content1;
      showScore = 67;
      year = 45;
      percentage = 58;
    } else if (score < 38) {
      title = this.data.title1;
      content = this.data.content1;
      showScore = 72;
      year = 40;
      percentage = 60;
    } else if (score < 46) {
      title = this.data.title2;
      content = this.data.content2;
      showScore = 78;
      year = 35;
      percentage = 67;
    } else if (score < 54) {
      title = this.data.title2;
      content = this.data.content2;
      showScore = 85;
      year = 30;
      percentage = 78;
    } else if (score < 62) {
      title = this.data.title3;
      content = this.data.content3;
      showScore = 92;
      year = 25;
      percentage = 93;
    } else if (score < 70) {
      title = this.data.title4;
      content = this.data.content4;
      showScore = 99;
      year = 21;
      percentage = 99;
    } else if (score = 70) {
      title = this.data.title4;
      content = this.data.content4;
      showScore = 100;
      year = 20;
      percentage = 100;
    }

    this.setData({
      title,
      content,
      showScore,
      year,
      percentage,
      index: Math.floor(Math.random() * adData.length)
    });
  },
  //保存分数
  saveScore: function (score) {
    var userInfo = app.globalData.userInfo;
    API.questionnaire.commit({
      name: '视觉专项问卷',//问卷名
      accountId: app.globalData.userId,//提交人id
      questionnaireId: 2,//问卷id
      city: userInfo.city,//城市
      province: userInfo.province,//省份
      language: 0,//语言天赋得分
      logic: 0,//逻辑得分
      vision: score,//视觉得分
      body: 0,//身体得分
      music: 0,//音乐得分
      interpersonal: 0,//人际得分
      observation: 0, //观察得分
      cognition: 0,//自我认识得分
      //attributes: 12,//答案 json string
    }, (res) => {
      console.log(res)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})