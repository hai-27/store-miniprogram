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

const baseURL = "http://47.115.85.237:3000/";
// const baseURL = "http://localhost:3000/";
const $ajax = (api, params = {}) => {
  const url = baseURL + api;
  return new Promise((resolve) => {
    wx.showLoading({
      title: '加载中...',
    });
    wx.request({
      header: {
        'content-type': 'application/json'
      },
      url,
      method: params.type ? params.type : "post",
      data: params.data ? params.data : {},
      success: function(res) {
        resolve(res.data);
      },
      fail: function(error) {
        console.log(error);
      },
      complete: function(res) {
        wx.hideLoading();
        // console.log(res)
      }
    })
  });
}

module.exports = {
  formatTime: formatTime,
  baseURL,
  $ajax
}