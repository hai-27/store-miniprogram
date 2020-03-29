// pages/shoppingCart/shoppingCart.js

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
    getIsAllCheck() {
      return store.getIsAllCheck();
    },
    // 获取购物车勾选的商品数量
    getCheckNum() {
      return store.getCheckNum();
    },
    getTotalPrice() {
      return store.getTotalPrice();
    }
  },
  /**
   * 修改商品数量
   */
  async handleChangeNum(e) {
    // 判断数量是否发生变化
    if (e.detail.value == e.target.dataset.value) {
      return;
    }
    // 当修改数量时，默认勾选
    this.handleChangeChecked(e);
    // 向后端发起更新购物车的数据库信息请求
    let updateShoppingCartRes = await $ajax('user/shoppingCart/updateShoppingCart', {
      data: {
        user_id: getApp().globalData.userId,
        product_id: e.target.dataset.productid,
        num: e.detail.value
      }
    });

    switch (updateShoppingCartRes.code) {
      case "001":
        // 001代表更新成功
        // 更新状态
        store.updateShoppingCart({
          key: e.target.dataset.key,
          prop: "num",
          val: e.detail.value
        });
        break;
      default:
        // 提示更新失败信息
        $Message({
          content: updateShoppingCartRes.msg,
          type: 'error'
        });
    }
  },
  /**
   * 修改商品勾选状态
   */
  handleChangeChecked(e) {
    store.updateShoppingCart({
      key: e.target.dataset.key,
      prop: "check",
      val: !e.target.dataset.checked
    });
  },
  /**
   * 全选按钮
   */
  handleChangeCheckAll(e) {
    store.checkAll(!e.target.dataset.value)
  },
  /**
   * 删除购物车商品
   */
  async bindDelete(e) {
    // 向后端发起删除购物车的数据库信息请求
    let deleteShoppingCartRes = await $ajax('user/shoppingCart/deleteShoppingCart', {
      data: {
        user_id: getApp().globalData.userId,
        product_id: e.target.dataset.productid
      }
    });
    switch (deleteShoppingCartRes.code) {
      case "001":
        // 001删除成功
        // 更新状态
        store.deleteShoppingCart(e.target.dataset.productid);
        // 提示删除成功信息
        $Message({
          content: deleteShoppingCartRes.msg,
          type: 'success'
        });
        break;
      default:
        // 提示删除失败信息
        $Message({
          content: deleteShoppingCartRes.msg,
          type: 'error'
        });
    }
  },
  /**
   * 去结算
   */
  toPay(){
    if (!this.data.getCheckNum){
      $Message({
        content: '请先勾选商品再结算！',
        type: 'error'
      });
      return;
    }
    wx.navigateTo({
      url: '/pages/confirmOrder/confirmOrder'
    })
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