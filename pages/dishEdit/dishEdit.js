const menuStore = require('../../utils/menuStore.js');

const GRADS = [
  ['#FFB088', '#FF7E5F'],
  ['#FFD194', '#FF9A8B'],
  ['#FFC371', '#FF5F6D'],
  ['#F6D365', '#FDA085'],
  ['#FFAFBD', '#FFC3A0'],
  ['#FFCBA4', '#FF8C69'],
  ['#A8E6CF', '#56C596'],
  ['#B5DEFF', '#7FB5FF']
];

const EMOJIS = ['🍚','🍜','🍲','🍳','🥘','🍗','🍖','🥗','🍤','🍰','🍦','🧋','🥤','🍊','🍅','🥟','🍔','🍕','🍩','🍪','🧇','🥪','🍛','🫕'];

Page({
  data: {
    isEdit: false,
    id: '',
    name: '',
    catIndex: 0,
    categories: [],
    price: '',
    originalPrice: '',
    desc: '',
    tags: '',
    emoji: '🍽️',
    gradIndex: 0,
    grads: GRADS,
    emojis: EMOJIS,
    supportSpicy: true,
    supportPortion: true,
    recommend: false,
    image: ''
  },

  onLoad(options) {
    const categories = menuStore.getCategories();
    const data = { categories: categories };
    if (options.id) {
      const d = menuStore.getDishById(options.id);
      if (d) {
        data.isEdit = true;
        data.id = d.id;
        data.name = d.name;
        data.catIndex = Math.max(0, categories.findIndex(c => c.id === d.cat));
        data.price = String(d.price);
        data.originalPrice = d.originalPrice ? String(d.originalPrice) : '';
        data.desc = d.desc || '';
        data.tags = Array.isArray(d.tags) ? d.tags.join('，') : '';
        data.emoji = d.emoji || '🍽️';
        data.supportSpicy = !!d.supportSpicy;
        data.supportPortion = !!d.supportPortion;
        data.recommend = !!d.recommend;
        data.image = d.image || '';
        const gi = GRADS.findIndex(g => g[0] === (d.grad && d.grad[0]) && g[1] === (d.grad && d.grad[1]));
        data.gradIndex = gi >= 0 ? gi : 0;
      }
    }
    this.setData(data);
  },

  onName(e) { this.setData({ name: e.detail.value }); },
  onPrice(e) { this.setData({ price: e.detail.value }); },
  onOriginal(e) { this.setData({ originalPrice: e.detail.value }); },
  onDesc(e) { this.setData({ desc: e.detail.value }); },
  onTags(e) { this.setData({ tags: e.detail.value }); },
  onEmojiInput(e) { this.setData({ emoji: e.detail.value || '🍽️' }); },

  pickEmoji(e) { this.setData({ emoji: e.currentTarget.dataset.e }); },
  onCatChange(e) { this.setData({ catIndex: Number(e.detail.value) }); },
  pickGrad(e) { this.setData({ gradIndex: Number(e.currentTarget.dataset.i) }); },

  toggleSpicy(e) { this.setData({ supportSpicy: e.detail.value }); },
  togglePortion(e) { this.setData({ supportPortion: e.detail.value }); },
  toggleRecommend(e) { this.setData({ recommend: e.detail.value }); },

  chooseImage() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const temp = res.tempFiles[0].tempFilePath;
        const fs = wx.getFileSystemManager();
        fs.saveFile({
          tempFilePath: temp,
          success: (r) => {
            this.setData({ image: r.savedFilePath });
            wx.showToast({ title: '图片已保存', icon: 'success' });
          },
          fail: () => {
            // 保存失败则退而用临时路径（仅当前会话有效）
            this.setData({ image: temp });
          }
        });
      }
    });
  },

  removeImage() { this.setData({ image: '' }); },

  save() {
    const d = this.data;
    const name = (d.name || '').trim();
    const price = Number(d.price);
    if (!name) { wx.showToast({ title: '请填写菜品名称', icon: 'none' }); return; }
    if (!isFinite(price) || price <= 0) { wx.showToast({ title: '请填写有效价格', icon: 'none' }); return; }

    const cat = d.categories[d.catIndex] ? d.categories[d.catIndex].id : (d.categories[0] && d.categories[0].id);
    let base = {};
    if (d.id) {
      const existing = menuStore.getDishById(d.id);
      if (existing) base = existing;
    }
    const dish = Object.assign({}, base, {
      id: d.id || '',
      name: name,
      cat: cat,
      emoji: d.emoji || '🍽️',
      grad: GRADS[d.gradIndex] || GRADS[0],
      price: price,
      originalPrice: d.originalPrice ? Number(d.originalPrice) : null,
      desc: (d.desc || '').trim(),
      tags: (d.tags || '').trim(),
      supportSpicy: d.supportSpicy,
      supportPortion: d.supportPortion,
      recommend: d.recommend,
      image: d.image || ''
    });

    menuStore.upsertDish(dish);
    wx.showToast({ title: '已保存', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 600);
  }
});
