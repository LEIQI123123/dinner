const mock = require('../../utils/mock.js');
const menuStore = require('../../utils/menuStore.js');
const priceUtil = require('../../utils/price.js');

Page({
  data: {
    banners: [],
    categories: [],
    recommend: [],
    hot: [],
    cartCount: 0,
    cartTotal: 0,
    cartVisible: false
  },

  onLoad() {
    this.setData({
      banners: mock.promos.banners,
      categories: menuStore.getCategories(),
      recommend: menuStore.getRecommend(),
      hot: menuStore.getHot()
    });
  },

  onShow() {
    // 菜单可能在「管理」页被改动，回到首页时刷新展示
    this.setData({
      categories: menuStore.getCategories(),
      recommend: menuStore.getRecommend(),
      hot: menuStore.getHot()
    });
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

  goDetail(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.detail.id });
  },

  goCategory(e) {
    const id = e.currentTarget.dataset.id;
    const app = getApp();
    app.globalData.pendingCat = id;
    wx.switchTab({ url: '/pages/menu/menu' });
  },

  goMenu() {
    wx.switchTab({ url: '/pages/menu/menu' });
  },

  goManage() {
    wx.navigateTo({ url: '/pages/manage/manage' });
  }
});
