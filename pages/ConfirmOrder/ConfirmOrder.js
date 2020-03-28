// pages/ConfirmOrder/ConfirmOrder.js
import create from '../../utils/create';
import store from '../../store/index';
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
    getCheckGoods(){
      return store.getCheckGoods();
    },
    // 订单总价
    getTotalPrice(){
      return store.getTotalPrice();
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