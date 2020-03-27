import {
  shoppingCart,
  getters,
  actions
} from '/shoppingCart.js';

const store = {
  data: {
    shoppingCart: shoppingCart
  },
  ...getters,
  ...actions,
  //无脑全部更新，组件或页面不需要声明 use
  //updateAll: true,
  debug: true
}
export default store