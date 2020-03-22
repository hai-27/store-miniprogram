//index.js
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
    carousel: '',
    category: '',
    phoneList: '',
    tvList: '',
    applianceList: '',
    accessoryList: ''
  },

  // 点击分类
  tapCategory(e) {
    // wx.switchTab不支持传递参数
    // 把点击的分类id存在globalData中，跳转发现页面后可以获取到
    getApp().globalData.categoryId = e.currentTarget.dataset.categoryid;
    // d导航到发现页面
    wx.switchTab({
      url: "/pages/goods/goods"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 从后端获取需要的数据
    let carouselRes = await $ajax('resources/carousel'); // 轮播图
    let categoryRes = await $ajax('product/getCategory'); // 分类列表
    // 手机热买推销数据
    let phoneList = await $ajax('product/getPromoProduct', {
      data: {
        categoryName: "手机"
      }
    });
    // 电视机热买推销数据
    let tvList = await $ajax('product/getPromoProduct', {
      data: {
        categoryName: "电视机"
      }
    });
    // 家电热买推销数据
    let applianceList = await $ajax('product/getHotProduct', {
      data: {
        categoryName: ["电视机", "空调", "洗衣机"],
      }
    });
    // 配件热买推销数据
    let accessoryList = await $ajax('product/getHotProduct', {
      data: {
        categoryName: ["保护套", "保护膜", "充电器", "充电宝"]
      }
    });

    // 删除最后一条数据，保留6条数据
    phoneList.Product.pop();
    tvList.Product.pop();
    applianceList.Product.pop();
    accessoryList.Product.pop();

    // 处理分类列表
    let categoryTemp = [];
    let item = [];
    for (let i = 0; categoryRes.category.length > i; i++) {
      const temp = categoryRes.category[i];
      if ((i + 1) % 4 == 0) {
        item.push(temp);
        categoryTemp.push(item);
        item = [];
      } else {
        item.push(temp);
      }
    }

    this.setData({
      carousel: carouselRes.carousel,
      category: categoryTemp,
      phoneList: phoneList.Product,
      tvList: tvList.Product,
      applianceList: applianceList.Product,
      accessoryList: accessoryList.Product
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