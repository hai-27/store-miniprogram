export const shoppingCart = []

/* 
// shoppingCart结构
shoppingCart = {
  id: "", // 购物车id
  productID: "", // 商品id
  productName: "", // 商品名称
  productImg: "", // 商品图片
  price: "", // 商品价格
  num: "", // 商品数量
  maxNum: "", // 商品限购数量
  check: false // 是否勾选
} */

export const getters = {
  getShoppingCart() {
    // 获取购物车状态
    return this.data.shoppingCart;
  },
  getNum() {
    // 购物车商品总数量
    let totalNum = 0;
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      totalNum += temp.num;
    }
    return totalNum;
  },
  getIsAllCheck() {
    // 判断是否全选
    let isAllCheck = true;
    if (this.data.shoppingCart.length==0){
      isAllCheck = false;
      return isAllCheck;
    }
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      // 只要有一个商品没有勾选立即return false;
      if (!temp.check) {
        isAllCheck = false;
        return isAllCheck;
      }
    }
    return isAllCheck;
  },
  getCheckGoods() {
    // 获取勾选的商品信息
    // 用于确认订单页面
    let checkGoods = [];
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      if (temp.check) {
        checkGoods.push(temp);
      }
    }
    return checkGoods;
  },
  getCheckNum() {
    // 获取购物车勾选的商品数量
    let totalNum = 0;
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      if (temp.check) {
        totalNum += temp.num;
      }
    }
    return totalNum;
  },
  getTotalPrice() {
    // 购物车勾选的商品总价格
    let totalPrice = 0;
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      if (temp.check) {
        totalPrice += temp.price * temp.num;
      }
    }
    return totalPrice;
  }
};

export const actions = {
  unshiftShoppingCart(data) {
    // 添加购物车
    // 用于在商品详情页点击添加购物车,后台添加成功后，更新状态
    this.data.shoppingCart.unshift(data);
  },
  updateShoppingCart(payload) {
    // 更新购物车
    // 可更新商品数量和是否勾选
    // 用于购物车点击勾选及加减商品数量
    if (payload.prop == "num") {
      // 判断效果的商品数量是否大于限购数量或小于1
      if (this.data.shoppingCart[payload.key].maxNum < payload.val) {
        return;
      }
      if (payload.val < 1) {
        return;
      }
    }
    // 根据商品在购物车的数组的索引和属性更改
    this.data.shoppingCart[payload.key][payload.prop] = payload.val;
  },
  addShoppingCartNum(productID) {
    // 增加购物车商品数量
    // 用于在商品详情页点击添加购物车,后台返回002，“该商品已在购物车，数量 +1”，更新商品数量
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      if (temp.productID == productID) {
        if (temp.num < temp.maxNum) {
          temp.num++;
        }
      }
    }
  },
  deleteShoppingCart(productID) {
    // 根据购物车id删除购物车商品
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      const temp = this.data.shoppingCart[i];
      if (temp.productID == productID) {
        console.log("说出来")
        this.data.shoppingCart.splice(i, 1);
      }
    }
  },
  checkAll(data) {
    // 点击全选按钮，更改每个商品的勾选状态
    for (let i = 0; i < this.data.shoppingCart.length; i++) {
      this.data.shoppingCart[i].check = data;
    }
  }
};

// export default {
//   shoppingCart,
//   getters,
//   actions
// }