Page({
  data: {
    inputShowed: false,
    inputVal: "",
    search: JSON.parse(wx.getStorageSync("search") || '[]'),
    showSearch: ''
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    const inputVal = e.detail.value;
    // 判断是否为空
    let showSearch = ''
    if (inputVal) {
      // 过滤数组,过滤出来类似的数据
      showSearch = this.data.search.filter(item => {
        if (item != inputVal) {
          return item.includes(inputVal);
        }
      })
    }
    this.setData({
      inputVal,
      showSearch
    });
  },
  // 确认搜索条件
  searchConfirm: function(e) {
    const inputVal = this.data.inputVal;
    if (inputVal) {
      // 判断是否已经存在该数据，没有则添加
      if (this.data.search.indexOf(inputVal) < 0) {
        this.data.search.push(inputVal)
        wx.setStorageSync('search', JSON.stringify(this.data.search));
      }
      // 向父组件传值
      this.triggerEvent('myevent', {
        search: inputVal
      });

      this.setData({
        inputVal: ""
      });
      this.hideInput();
    }
  },
  // searchBlur: function() {
  //   // 离焦确认搜索
  //   this.searchConfirm();
  // },

  // 点击历史搜索记录
  searchItemTap: function(e) {
    console.log("vbdjvsdbsj")
    let inputVal = e.currentTarget.dataset.search;
    this.setData({
      inputVal
    })
    this.searchConfirm();
  }
});