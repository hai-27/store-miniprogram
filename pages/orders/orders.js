// pages/orders/orders.js
const util = require('../../utils/util.js')
const {
  baseURL,
  $ajax
} = getApp().globalData;
const {
  $Message
} = require('../../components/iview/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseURL,
    util,
    orders: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: async function() {
    // 获取用户订单信息
    let orderRes = await $ajax('user/order/getOrder', {
      data: {
        user_id: getApp().globalData.userId
      }
    });
    if (orderRes.code === "001") {
      // 计算每个订单的总价格
      let total = [];
      for (let i = 0; i < orderRes.orders.length; i++) {
        const element = orderRes.orders[i];

        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalPrice += temp.product_price * temp.product_num;

          element[j].order_time = util.formatTime(new Date(element[j].order_time))
        }
        total.push(totalPrice);
      }
      this.setData({
        orders: orderRes.orders,
        total: total
      });
    } else {
      $Message({
        content: orderRes.msg,
        type: 'error'
      });
    }
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