const {
  adData
} = require('../../../utils/quesData.js')
const API = require('../../../utils/api.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    content : '',
    showScore: 0,
    year: 0,
    percentage: 0,
    adData,
    index: 0,
    title1: '良好',
    content1:'您的孩子在乐感上有着不错的表现，可以培养一下孩子对音乐的兴趣，但是不要以为学习音乐一定得学习某种乐器，虽然让孩子学习和掌握一种乐器的演奏技巧是一件很让人骄傲的事，但对于0－3岁的幼儿来说，的确没有太大的必要。对于这个阶段的孩子，让他听听音乐或是唱唱儿歌，有机会还可以带他去观看音乐会或艺术展出，这种教育效果也许会更好。',
    title2: '出色',
    content2: '也许你的孩子在各方面平平，然而就对音乐有特殊的感情，孩子内心深处是对音乐非常感兴趣的，并且具备相当的天分。音乐会让您的孩子更聪明，孩子80%的音乐潜能在6岁前更易开发出来。但培养孩子的音乐素质并不简单，就算是音乐神童也需要从头学起，尤其是当今社会，孩子从小对音乐有好感是一种普遍现象，因此，父母在发现孩子具有音乐天赋时，不必过于高兴。因为，音乐神童也要经历一个完整、系统的学习过程。如果想要让孩子正规地学习音乐，父母最好先让孩子多接触音乐，从培养孩子对音乐产生感觉开始。',
    title3:'杰出',
    content3:'我们似乎发觉您孩子在音乐上有着比其他同龄人更强烈的感觉，喜欢音乐的孩子不但会有敏锐的听力，也会拥有敏锐的感觉。孩子80%的音乐潜能在6岁前更易开发出来，过了6岁这个关键期，存在一个反U曲线，只能开发剩下的20%了。那么孩子到底是更适合学钢琴，还是小提琴？这是让很多父母头疼的问题。有些父母在不了解孩子的音乐天赋和兴趣的情况下，强行为孩子报班学习乐器，导致孩子产生厌烦、不愿意学的情绪，甚至会“学会一门技术，痛恨一门艺术”。不如让孩子在玩乐中更加热爱音乐，为了让孩子爱上音乐，请在孩子一个良好的音乐环境！',
    title4:'卓越',
    content4: '哇～您的孩子也太棒了吧！在这个世界上，恐怕很难有什么东西比音乐更抽象了，它只是一组声音，转瞬即逝，但音乐又是世界上内涵最丰富的东西，它留给人们的想象空间无边无际。这种天生具备的潜在能力会随着年龄的增长而递减，到一定年龄后，就很难再被唤醒，潜在能力逐渐消失了！为了让音乐有机会雕刻您孩子的大脑和心灵，为了让孩子爱上音乐，请在孩子一个良好的音乐环境！'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var score = options.score;
    if (score) {
      this.saveScore(score);
      this.renderPage(score);
    } else {
      API.questionnaire.getNaireDetail({
        userId: app.globalData.userId,
        id: 3
      }, (res) => {
        if (res.success && res.data) {
          var data = res.data;
          score = data.music;
        } else {
          score = 0;
        }
        this.renderPage(score);
      })
    }

  },

  renderPage: function(score) {
    this.setData({
      score
    });
    var showScore = score;
    var year = 50;
    var percentage = 50;
    var title='';
    var content = '';
    if (score == 0) {
      showScore = 50;
      title = this.data.title1;
      content= this.data.content1;
      year = 50;
      percentage = 55;
    } else if (score == 60) {
      title = this.data.title1;
      content = this.data.content1;
      year = 45;
      percentage = 60;
    } else if (score == 75) {
      title = this.data.title2;
      content = this.data.content2;
      year = 40;
      percentage = 78;
    } else if (score == 88) {
      title = this.data.title3;
      content = this.data.content3;
      year = 35;
      percentage = 85;
    } else if (score == 93) {
      title = this.data.title3;
      content = this.data.content3;
      year = 30;
      percentage = 91;
    } else if (score == 96) {
      title = this.data.title4;
      content = this.data.content4;
      year = 25;
      percentage = 98;
    } else {
      title = this.data.title4;
      content = this.data.content4;
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
  saveScore: function(score) {
    var userInfo = app.globalData.userInfo;
    API.questionnaire.commit({
      name: '音乐专项问卷', //问卷名
      accountId: app.globalData.userId, //提交人id
      questionnaireId: 3, //问卷id
      city: userInfo.city, //城市
      province: userInfo.province, //省份
      language: 0, //语言天赋得分
      logic: 0, //逻辑得分
      vision: 0, //视觉得分
      body: 0, //身体得分
      music: score, //音乐得分
      interpersonal: 0, //人际得分
      observation: 0, //观察得分
      cognition: 0, //自我认识得分
      //attributes: 12,//答案 json string
    }, (res) => {
      console.log(res)
    });
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