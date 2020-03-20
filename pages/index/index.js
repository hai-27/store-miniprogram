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
    category: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(options) {
    // 从后端获取需要的数据
    let carouselRes = await $ajax('resources/carousel'); // 轮播图
    let categoryRes = await $ajax('product/getCategory'); // 分类列表

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