//app.js
// import create from '/utils/create';
import store from '/store/index';
let {
  baseURL,
  $ajax
} = require('./utils/util.js')
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: async res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        let loginRes = await $ajax('users/miniProgramLogin', {
          data: {
            code: res.code
          }
        });
        // 登录成功
        if (loginRes.code === '001') {
          this.globalData.userId = loginRes.userId;
          // 获取购物车信息
          if (this.globalData.userId) {
            let shoppingCart = await $ajax('user/shoppingCart/getShoppingCart', {
              data: {
                user_id: this.globalData.userId
              }
            });
            store.data.shoppingCart = shoppingCart.shoppingCartData;
          }
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: '',
    baseURL,
    $ajax,
    categoryId: 0
  }
})