// pages/goods/goods.js
const {
  baseURL,
  $ajax
} = getApp().globalData;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentPage: 1,
    pageSize: 15,
    current_scroll: -1,
    category: [],
    search: '',
    product: [],
    productTotal: 0
  },
  // 选择分类
  handleChangeScroll({detail}) {
    if (this.data.current_scroll != detail.key) {
      this.setData({
        search: '',
        current_scroll: detail.key,
        currentPage: 1,
        product: []
      });
      // 修改存在globalData中的分类id
      getApp().globalData.categoryId = detail.key;
      this.getData(); // 获取商品数据
    }
  },
  onSearch(e){
    let {search} = e.detail;
    if (search != this.data.search){
      this.setData({
        search,
        current_scroll: -1,
        currentPage: 1,
        product: []
      })
      this.getData(); // 获取搜索的商品数据
    }
  },
  // 获取商品数据
  async getData() {
    let api = '';
    if (this.data.search) {
      api = 'product/getProductBySearch';
    } else {
      api = this.data.current_scroll == 0 ? 'product/getAllProduct' : 'product/getProductByCategory';
    }

    let productTemp = await $ajax(api, {
      data: {
        search: this.data.search,
        categoryID: this.data.current_scroll,
        currentPage: this.data.currentPage,
        pageSize: this.data.pageSize
      }
    });
    const product = this.data.product.concat(productTemp.Product);
    this.setData({
      product,
      productTotal: productTemp.total
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 从后端获取需要的数据
    // this.getData(); // 获取商品数据
    let categoryRes = await $ajax('product/getCategory'); // 分类列表

    // 处理分类列表，添加“全部”
    const all = {
      category_id: 0,
      category_name: "全部"
    };
    let categoryTemp = categoryRes.category
    categoryTemp.unshift(all);

    this.setData({
      category: categoryTemp
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
    // 获取存在globalData中的分类id
    let categoryId = getApp().globalData.categoryId;
    // 如果globalData中的分类id与当前页面显示的分类id不等于，重新加载数据
    if (categoryId != this.data.current_scroll) {
      this.setData({
        current_scroll: categoryId,
        search: '',
        currentPage: 1,
        product: []
      })
      this.getData()
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
    if (this.data.productTotal > this.data.product.length) {
      this.setData({
        currentPage: this.data.currentPage + 1
      })
      this.getData();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})