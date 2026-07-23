Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/home/home', text: '首页', icon: '🏠', badge: 0 },
      { pagePath: '/pages/menu/menu', text: '菜单', icon: '📋', badge: 0 },
      { pagePath: '/pages/cart/cart', text: '购物车', icon: '🛒', badge: 0 }
    ]
  },

  lifetimes: {
    attached() {
      this.refresh();
    }
  },

  pageLifetimes: {
    show() {
      this.refresh();
    }
  },

  methods: {
    refresh() {
      const app = getApp();
      const count = app && app.getCartCount ? app.getCartCount() : 0;
      const pages = getCurrentPages();
      let idx = 0;
      if (pages && pages.length) {
        const route = pages[pages.length - 1].route; // e.g. "pages/home/home"
        const found = this.data.list.findIndex(it => it.pagePath === '/' + route);
        if (found >= 0) idx = found;
      }
      const list = this.data.list.map((it, i) =>
        i === 2 ? Object.assign({}, it, { badge: count }) : it
      );
      this.setData({ list, selected: idx });
    },

    switchTab(e) {
      const idx = e.currentTarget.dataset.index;
      const path = this.data.list[idx].pagePath;
      wx.switchTab({ url: path });
    }
  }
});
