const API = require('./api.js');

//存储用户信息
export const saveUserInfo = (app, sucFun) => {
  if(!app.globalData.openId){
    return;
  }
  var userInfo = app.globalData.userInfo;
  API.account.saveUserInfo({
    name: userInfo.nickName,
    imgUrl: userInfo.avatarUrl,
    uniqueId: app.globalData.openId
  }, (res) => {
    if(res.success){
      app.globalData.userId = res.data.id;
      app.globalData.ykUserInfo = res.data;
      app.getYKUserInfoSucc ? app.getYKUserInfoSucc() : null;
    }
  })
}