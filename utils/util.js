const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const wxRequest = (reqType, url, param, sucFun) => {
  wx.request({
    url: url,
    data: param,
    method: reqType,
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log('请求成功');
      sucFun && typeof sucFun == 'function' ? sucFun(res.data) : '';
    },
    fail: function(err){
      console.log(err)
    }
  })
}

module.exports = {
  formatTime: formatTime,
  wxRequest: wxRequest
}
