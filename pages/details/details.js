// pages/details/details.js
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
    baseURL,
    productID: '',
    productInfo: '',
    productImages: '',
    hotProduct: ''
  },
  computed: {
    // 购物车商品总数量
    getNum(){
      return store.getNum();
    }
  },
  // 加入购物车
  async addShoppingCart() {
    // 判断是否登录,没有登录则显示登录组件
    if (!getApp().globalData.userId) {
      // 先登录
      return;
    }
    let shoppingCart = await $ajax('user/shoppingCart/addShoppingCart', {
      data: {
        user_id: getApp().globalData.userId,
        product_id: this.data.productID
      }
    });
    console.log(shoppingCart)
    switch (shoppingCart.code) {
      case "001":
        // 新加入购物车成功
        store.unshiftShoppingCart(shoppingCart.shoppingCartData[0]);
        // this.notifySucceed(res.data.msg);
        break;
      case "002":
        // 该商品已经在购物车，数量+1
        store.addShoppingCartNum(this.data.productID);
        // this.notifySucceed(res.data.msg);
        break;
      case "003":
        // 商品数量达到限购数量
        // this.dis = true;
        // this.notifyError(res.data.msg);
        break;
      default:
        // this.notifyError(res.data.msg);
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