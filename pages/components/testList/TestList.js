// pages/testList/testList.js
const app = getApp()
Component({
  properties: {
    change:{
      value: false,
      type: 'boolean'
    },
    listData: {
      value: [],
      type: 'Array'
    }
  },
  data: {
    // 这里是一些组件内部数据
    lockImg: 'http://image.317hu.com/FiTdIbr4OMKPAFtuhm0yykOHUKHR?imageView2/2/w/700/q/100/interlace/1',
    unLockImg: 'http://image.317hu.com/FrDSFAt2ll5edFR3kiFAHZkL2GZH?imageView2/2/w/700/q/100/interlace/1',
    
  },
  ready: function(){
    
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function () { },
    navigatorHandler: function(e){
      var index = e.currentTarget.dataset.index;
      var listData = this.data.listData;
      if (listData[index-1].hasContent){
        wx.navigateTo({
          url: listData[index-1].link + '?id=' + index,
          success: function (res) { },
          fail: function (res) { },
          complete: function (res) { },
        })
      }else{
        wx.showToast({
          title: "问卷正在整理中，敬请期待",
          icon: 'none'
        });
      }
    }
  }
})