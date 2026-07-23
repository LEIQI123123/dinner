const menuStore = require('../../utils/menuStore.js');
const priceUtil = require('../../utils/price.js');

Page({
  data: {
    catList: [],
    activeCat: '',
    scrollInto: '',
    cartCount: 0,
    cartTotal: 0,
    cartVisible: false,
    _scrolling: false
  },

  onLoad() {
    this.buildCatList();
    this._offsets = [];
  },

  onReady() {
    setTimeout(() => this.computeOffsets(), 300);
  },

  onShow() {
    // 菜单可能在「管理」页被增删改，回到本页时刷新
    this.buildCatList();
    this.applyPendingCat();
    if (this._offsets && this._offsets.length) {
      setTimeout(() => this.computeOffsets(), 300);
    }
    this.refreshCart();
  },

  buildCatList() {
    const catList = menuStore.getCategories().map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      dishes: menuStore.getByCat(c.id)
    })).filter(c => c.dishes.length); // 隐藏没有菜品的分类
    this.setData({
      catList: catList,
      activeCat: catList.length ? this.data.activeCat || catList[0].id : ''
    });
  },

  applyPendingCat() {
    const app = getApp();
    const pending = app.globalData.pendingCat;
    if (pending && this.data.catList.some(c => c.id === pending)) {
      this.setData({ activeCat: pending, scrollInto: 'cat-' + pending, _scrolling: true });
      setTimeout(() => { this.data._scrolling = false; }, 450);
    }
    app.globalData.pendingCat = null;
  },

  computeOffsets() {
    const q = wx.createSelectorQuery().in(this);
    this.data.catList.forEach(cat => {
      q.select('#cat-' + cat.id).boundingClientRect();
    });
    q.select('.dish-list').boundingClientRect();
    q.exec(res => {
      if (!res || res.length < this.data.catList.length + 1) return;
      const count = this.data.catList.length;
      const listRect = res[count];
      const baseTop = listRect ? listRect.top : 0;
      this._offsets = res.slice(0, count).map(r => (r ? r.top - baseTop : 0));
    });
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

  onTapCat(e) {
    const id = e.currentTarget.dataset.id;
    this.setData({ activeCat: id, scrollInto: 'cat-' + id, _scrolling: true });
    setTimeout(() => { this.data._scrolling = false; }, 450);
  },

  onScroll(e) {
    if (this.data._scrolling) return;
    const top = e.detail.scrollTop;
    const offs = this._offsets || [];
    let active = this.data.activeCat;
    for (let i = 0; i < offs.length; i++) {
      if (top >= offs[i] - 12) active = this.data.catList[i].id;
      else break;
    }
    if (active !== this.data.activeCat) this.setData({ activeCat: active });
  },

  goDetail(e) {
    wx.navigateTo({ url: '/pages/detail/detail?id=' + e.detail.id });
  },

  goManage() {
    wx.navigateTo({ url: '/pages/manage/manage' });
  }
});
