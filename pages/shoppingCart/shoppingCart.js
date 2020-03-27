// pages/shoppingCart/shoppingCart.js

import create from '../../utils/create';
import store from '../../store/index';
const {
  baseURL,
  $ajax
} = getApp().globalData;

create.Page(store, {

  use: ['shoppingCart'],
  /**
   * 页面的初始数据
   */
  data: {
    baseURL
  },
  computed: {
    // 获取购物车状态
    getShoppingCart() {
      return store.getShoppingCart();
    },
    // 判断是否全选
    getIsAllCheck(){
      return store.getIsAllCheck();
    },
    // 获取购物车勾选的商品数量
    getCheckNum(){
      return store.getCheckNum();
    },
    getTotalPrice(){
      return store.getTotalPrice();
    }
  },
  /**
   * 修改商品数量
   */
  handleChangeNum(e) {
    console.log(store)
    store.updateShoppingCart({
      key: e.target.dataset.key,
      prop: "num",
      val: e.detail.value
    })
  },
  /**
   * 修改商品勾选状态
   */
  handleChangeChecked(e) {
    console.log(e)
    store.updateShoppingCart({
      key: e.target.dataset.key,
      prop: "check",
      val: !e.target.dataset.value
    })
  },
  handleChangeCheckAll(e){
    store.checkAll(!e.target.dataset.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {

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