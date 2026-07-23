Component({
  properties: {
    count: { type: Number, value: 0 },
    total: { type: Number, value: 0 },
    visible: { type: Boolean, value: false }
  },
  methods: {
    onCart() {
      wx.switchTab({ url: '/pages/cart/cart' });
    },
    onCheckout() {
      wx.navigateTo({ url: '/pages/checkout/checkout' });
    }
  }
});
