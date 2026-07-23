const menuStore = require('../../utils/menuStore.js');

Page({
  data: {
    groups: []
  },

  onShow() {
    this.refresh();
  },

  refresh() {
    const groups = menuStore.getCategories().map(c => ({
      id: c.id,
      name: c.name,
      icon: c.icon,
      dishes: menuStore.getByCat(c.id)
    })).filter(g => g.dishes.length);
    this.setData({ groups: groups });
  },

  goAdd() {
    wx.navigateTo({ url: '/pages/dishEdit/dishEdit' });
  },

  goEdit(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: '/pages/dishEdit/dishEdit?id=' + id });
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    const name = e.currentTarget.dataset.name;
    wx.showModal({
      title: '删除菜品',
      content: '确定删除「' + name + '」吗？此操作不可恢复。',
      confirmColor: '#FF5A3C',
      success: (res) => {
        if (res.confirm) {
          menuStore.deleteDish(id);
          this.refresh();
          wx.showToast({ title: '已删除', icon: 'success' });
        }
      }
    });
  }
});
