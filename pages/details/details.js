// pages/details/details.js
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
    baseURL,
    productID: '',
    productInfo: '',
    productImages: '',
    hotProduct: '',
    full: false
  },
  computed: {
    // 购物车商品总数量
    getNum() {
      return store.getNum();
    }
  },
  /**
   * 添加购物车
   */
  async addShoppingCart() {
    // 判断是否登录
    if (!getApp().globalData.userId) {
      // 先登录
      return;
    }
    // 如果达到限购数量不继续执行
    if (this.data.full) {
      $Message({
        content: "加购数量达到限购数量",
        type: 'warning'
      });
      return;
    }
    // 向后端发起加入购物车的请求
    let addShoppingCartRes = await $ajax('user/shoppingCart/addShoppingCart', {
      data: {
        user_id: getApp().globalData.userId,
        product_id: this.data.productID
      }
    });
    switch (addShoppingCartRes.code) {
      case "001":
        // 新加入购物车成功
        store.unshiftShoppingCart(addShoppingCartRes.shoppingCartData[0]);
        $Message({
          content: addShoppingCartRes.msg,
          type: 'success'
        });
        break;
      case "002":
        // 该商品已经在购物车，数量+1
        store.addShoppingCartNum(this.data.productID);
        $Message({
          content: addShoppingCartRes.msg,
          type: 'success'
        });
        break;
      case "003":
        // 商品数量达到限购数量
        this.data.full = true;
        $Message({
          content: addShoppingCartRes.msg,
          type: 'warning'
        });
        break;
      default:
        $Message({
          content: addShoppingCartRes.msg,
          type: 'error'
        });
    }
  },
  /**
   * 添加收藏
   */
  async addCollect() {
    // 判断是否登录
    if (!getApp().globalData.userId) {
      // 先登录
      return;
    }

    // 向后端发起加入购物车的请求
    let addCollect = await $ajax('user/collect/addCollect', {
      data: {
        user_id: getApp().globalData.userId,
        product_id: this.data.productID
      }
    });

    if (addCollect.code == "001") {
      // 添加收藏成功
      $Message({
        content: addCollect.msg,
        type: 'success'
      });
    } else {
      // 添加收藏失败
      $Message({
        content: addCollect.msg,
        type: 'error'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    const {
      productID
    } = options; // 接收路由传递的商品id
    // 从后端获取需要的数据
    // 商品数据
    let product = await $ajax('product/getDetails', {
      data: {
        productID
      }
    });
    // 商品图片
    let productImages = await $ajax('product/getDetailsPicture', {
      data: {
        productID
      }
    });
    this.setData({
      productID,
      productImages: productImages.ProductPicture,
      productInfo: product.Product[0]
    });
    // 获取推荐商品信息
    let hotProduct = await $ajax('product/getProductByCategory', {
      data: {
        categoryID: this.data.productInfo.category_id,
        currentPage: 1,
        pageSize: 10
      }
    });
    this.setData({
      hotProduct: hotProduct.Product
    })
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