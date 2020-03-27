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
        'content-type': 'application/json',
        Cookie: wx.getStorageSync("cookie")
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
        // 隐藏loading图标
        wx.hideLoading();

        // 把cookie存在本地
        if (res.header['Set-Cookie']) {
          const reg = /koa\S*;/g
          const tempCookie = res.header['Set-Cookie'].match(reg)
          const cookie = tempCookie[0] + ' ' + tempCookie[1];
          wx.setStorageSync('cookie', cookie);
        }
      }
    })
  });
}

module.exports = {
  formatTime: formatTime,
  baseURL,
  $ajax
}