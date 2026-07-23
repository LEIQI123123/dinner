const addrUtil = require('../../utils/address.js');

Page({
  data: {
    addresses: [],
    fromCheckout: false,
    selectedId: ''
  },

  onLoad(options) {
    this.setData({ fromCheckout: options.from === 'checkout' });
  },

  onShow() {
    const app = getApp();
    this.setData({
      addresses: app.globalData.addresses,
      selectedId: app.globalData.selectedAddressId
    });
  },

  selectAddr(e) {
    const id = e.currentTarget.dataset.id;
    const app = getApp();
    app.globalData.selectedAddressId = id;
    if (this.data.fromCheckout) {
      wx.navigateBack();
    } else {
      this.setData({ selectedId: id });
    }
  },

  addAddr() {
    wx.navigateTo({ url: '/pages/addressEdit/addressEdit' });
  },

  editAddr(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/addressEdit/addressEdit?id=' + id });
  },

  setDefault(e) {
    const id = e.currentTarget.dataset.id;
    const app = getApp();
    const list = addrUtil.setDefault(app.globalData.addresses, id);
    app.globalData.addresses = list;
    if (this.data.fromCheckout) app.globalData.selectedAddressId = id;
    this.setData({ addresses: list });
  },

  removeAddr(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '删除地址',
      content: '确定删除该地址吗？',
      confirmColor: '#FF7E5F',
      success: (res) => {
        if (res.confirm) {
          const app = getApp();
          const list = addrUtil.remove(app.globalData.addresses, id);
          app.globalData.addresses = list;
          if (app.globalData.selectedAddressId === id) {
            const def = list.find(a => a.isDefault) || list[0];
            app.globalData.selectedAddressId = def ? def.id : null;
          }
          this.setData({ addresses: list });
        }
      }
    });
  },

  confirmSelect() {
    wx.navigateBack();
  }
});
