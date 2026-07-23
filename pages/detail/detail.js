const menuStore = require('../../utils/menuStore.js');
const priceUtil = require('../../utils/price.js');

Page({
  data: {
    dish: null,
    specShow: false,
    specDish: null,
    cartCount: 0,
    cartTotal: 0,
    cartVisible: false
  },

  onLoad(options) {
    const dish = menuStore.getDishById(options.id);
    if (!dish) {
      wx.showToast({ title: '菜品不存在', icon: 'none' });
      return;
    }
    this.setData({ dish: dish });
    wx.setNavigationBarTitle({ title: dish.name });
  },

  onShow() {
    this.refreshCart();
  },

  refreshCart() {
    const app = getApp();
    const cart = app.globalData.cart;
    const r = priceUtil.calc(cart, app.globalData.promo);
    this.setData({
      cartCount: app.getCartCount(),
      cartTotal: r.total,
      cartVisible: cart.length > 0
    });
  },

  goCart() {
    wx.switchTab({ url: '/pages/cart/cart' });
  },

  openSpec() {
    this.setData({ specShow: true, specDish: this.data.dish });
  },

  closeSpec() {
    this.setData({ specShow: false });
  },

  onConfirm(e) {
    const item = e.detail.item;
    const app = getApp();
    app.addToCart(item);
    this.setData({ specShow: false });
    this.refreshCart();
    wx.showToast({ title: '已加入购物车', icon: 'success' });
  }
});
