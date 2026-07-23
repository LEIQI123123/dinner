const priceUtil = require('../../utils/price.js');
const util = require('../../utils/util.js');

Page({
  data: {
    cart: [],
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    total: 0,
    address: null,
    remark: '',
    empty: true
  },

  onShow() {
    const app = getApp();
    const cart = app.globalData.cart;
    if (!cart.length) {
      this.setData({ empty: true, cart: [] });
      return;
    }
    const r = priceUtil.calc(cart, app.globalData.promo);
    const addrId = app.globalData.selectedAddressId;
    const address = app.globalData.addresses.find(a => a.id === addrId)
      || app.globalData.addresses[0]
      || null;
    this.setData({
      empty: false,
      cart: cart,
      subtotal: r.subtotal,
      discount: r.discount,
      deliveryFee: r.deliveryFee,
      total: r.total,
      address: address
    });
  },

  chooseAddr() {
    wx.navigateTo({ url: '/pages/address/address?from=checkout' });
  },

  onRemark(e) {
    this.setData({ remark: e.detail.value });
  },

  submit() {
    const app = getApp();
    if (!this.data.address) {
      wx.showToast({ title: '请选择收货地址', icon: 'none' });
      return;
    }
    if (!this.data.cart.length) return;

    const order = {
      orderNo: util.genOrderNo(),
      items: util.deepClone(this.data.cart),
      subtotal: this.data.subtotal,
      discount: this.data.discount,
      deliveryFee: this.data.deliveryFee,
      total: this.data.total,
      address: util.deepClone(this.data.address),
      remark: this.data.remark,
      createTime: Date.now(),
      estimatedMinutes: 30 + Math.floor(Math.random() * 20)
    };
    app.globalData.lastOrder = order;
    app.clearCart();
    wx.redirectTo({ url: '/pages/success/success' });
  }
});
