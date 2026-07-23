const mock = require('./utils/mock.js');
const cartUtil = require('./utils/cart.js');

App({
  globalData: {
    cart: [],
    addresses: [],
    selectedAddressId: null,
    promo: null,
    lastOrder: null
  },

  onLaunch() {
    const cart = wx.getStorageSync('cart');
    if (Array.isArray(cart)) {
      // 清理历史遗留的异常项（如早期版本误算出的负单价）
      this.globalData.cart = cart.filter(i => i && i.unitPrice >= 0);
    }

    let addresses = wx.getStorageSync('addresses');
    if (!Array.isArray(addresses) || !addresses.length) {
      addresses = mock.addresses;
      wx.setStorageSync('addresses', addresses);
    }
    this.globalData.addresses = addresses;

    if (!this.globalData.selectedAddressId) {
      const def = addresses.find(a => a.isDefault) || addresses[0];
      this.globalData.selectedAddressId = def ? def.id : null;
    }
    this.globalData.promo = mock.promos;
  },

  // ---------- 购物车方法 ----------
  addToCart(item) {
    this.globalData.cart = cartUtil.addToCart(this.globalData.cart, item);
    this._persistCart();
    this.emitCartChange();
  },
  updateQty(key, qty) {
    this.globalData.cart = cartUtil.updateQty(this.globalData.cart, key, qty);
    this._persistCart();
    this.emitCartChange();
  },
  removeItem(key) {
    this.globalData.cart = cartUtil.removeItem(this.globalData.cart, key);
    this._persistCart();
    this.emitCartChange();
  },
  clearCart() {
    this.globalData.cart = [];
    this._persistCart();
    this.emitCartChange();
  },
  getCartCount() {
    return this.globalData.cart.reduce((s, i) => s + i.quantity, 0);
  },
  _persistCart() {
    wx.setStorageSync('cart', this.globalData.cart);
  },

  // ---------- 事件总线（跨页同步购物车） ----------
  _listeners: [],
  onCartChange(fn) {
    if (typeof fn === 'function') this._listeners.push(fn);
  },
  offCartChange(fn) {
    this._listeners = this._listeners.filter(f => f !== fn);
  },
  emitCartChange() {
    const cart = this.globalData.cart;
    this._listeners.slice().forEach(fn => {
      try { fn(cart); } catch (e) { /* 忽略单个监听异常 */ }
    });
  }
});
