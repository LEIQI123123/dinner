const priceUtil = require('../../utils/price.js');

Page({
  data: {
    cart: [],
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    tip: null,
    empty: true
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const app = getApp();
    const cart = app.globalData.cart;
    const r = priceUtil.calc(cart, app.globalData.promo);
    this.setData({
      cart: cart,
      subtotal: r.subtotal,
      discount: r.discount,
      deliveryFee: r.deliveryFee,
      total: r.total,
      tip: r.tip,
      empty: cart.length === 0
    });
  },

  onQty(e) {
    const key = e.currentTarget.dataset.key;
    const qty = e.detail.value;
    getApp().updateQty(key, qty);
    this.refresh();
  },

  removeItem(e) {
    const key = e.currentTarget.dataset.key;
    getApp().removeItem(key);
    this.refresh();
  },

  clearAll() {
    wx.showModal({
      title: '清空购物车',
      content: '确定要清空购物车吗？',
      confirmColor: '#FF7E5F',
      success: (res) => {
        if (res.confirm) {
          getApp().clearCart();
          this.refresh();
        }
      }
    });
  },

  goCheckout() {
    if (!this.data.cart.length) return;
    wx.navigateTo({ url: '/pages/checkout/checkout' });
  }
});
