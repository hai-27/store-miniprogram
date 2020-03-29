// pages/ConfirmOrder/ConfirmOrder.js
import create from '../../utils/create';
import store from '../../store/index';
const {
  $Message
} = require('../../components/iview/base/index');
const {
  baseURL,
  $ajax
} = getApp().globalData;

create.Page(store, {

  /**
   * 页面的初始数据
   */
  data: {
    baseURL
  },

  computed: {
    // 获取结算商品信息
    getCheckGoods() {
      return store.getCheckGoods();
    },
    // 订单总价
    getTotalPrice() {
      return store.getTotalPrice();
    }
  },
  /**
   * 提交订单
   */
  async confirmOrder(){
    let addOrderRes = await $ajax('user/order/addOrder', {
      data: {
        user_id: getApp().globalData.userId,
        products: this.data.getCheckGoods
      }
    });
    let products = this.data.getCheckGoods;
    switch (addOrderRes.code) {
      // 001代表结算成功
      case "001":
        for (let i = 0; i < products.length; i++) {
          const temp = products[i];
          // 删除已经结算的购物车商品
          store.deleteShoppingCart(temp.productID);
        }
        // 提示结算结果
        $Message({
          content: addOrderRes.msg,
          type: 'success'
        });
        // 跳转我的订单页面
        wx.navigateTo({
          url: '/pages/orders/orders'
        })
        break;
      default:
        // 提示失败信息
        $Message({
          content: addOrderRes.msg,
          type: 'error'
        });
    }
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
  onShow: function() {
    if (this.data.getCheckGoods.length == 0) {
      $Message({
        content: '请先勾选商品再结算！',
        type: 'error'
      });
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/shoppingCart/shoppingCart'
        });
      }, 1000)
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