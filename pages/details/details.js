// pages/details/details.js
const {
  baseURL,
  $ajax
} = getApp().globalData;
Page({

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