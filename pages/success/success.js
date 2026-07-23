Page({
  data: {
    order: null
  },

  onLoad() {
    const app = getApp();
    this.setData({ order: app.globalData.lastOrder || null });
  },

  goHome() {
    wx.reLaunch({ url: '/pages/home/home' });
  }
});
