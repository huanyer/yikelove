const { wxRequest } = require('./util.js')
const { APIURL } = require('./const.js')

const API = {
  account: {
    getOpenId: (data, succFun) => {
      wxRequest('GET', APIURL + '/v2/account/getOpenIdByCode', data, succFun);
    },
    saveUserInfo: (data, succFun) => {
      wxRequest('POST', APIURL + '/v2/account/add', data, succFun);
    },
    getAccountById: (data, succFun)=>{
      wxRequest('GET', APIURL + '/v2/account/getAccountById', data, succFun)
    },
    getAccountByOpenId: (data, succFun) => {
      wxRequest('GET', APIURL + '/v2/account/getAccountByOpenId', data, succFun);
    },
    buyQuestionnaireById: (data, succFun) => {
      wxRequest('POST', APIURL + '/v2/account/buyQuestionnaireById', data, succFun);
    },
    payMoneyForNaire: (data, succFun) => {
      wxRequest('GET', APIURL + '/v2/weixinPay/' + data.id + '/' + data.openId, data, succFun);
    },
    getQRCode: (data, succFun) => {
      wxRequest('POST', APIURL + '/v2/account/getQRCode', data, succFun);
    },
  },
  feedback: {
    add: (data, succFun) => {
      wxRequest('POST', APIURL + '/v2/feedback/add', data, succFun);
    },
  },
  questionnaire: {
    commit: (data, succFun) => {
      wxRequest('POST', APIURL + '/v2/questionnaire/commit', data, succFun);
    },
    getNaireDetail: (data, succFun) => {
      wxRequest('GET', APIURL + '/v2/questionnaire/get/'+data.userId+'/'+data.id, {}, succFun);
    },
  }

};
module.exports = API;