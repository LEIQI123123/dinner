// 菜单数据层：以 mock 为种子，用户编辑后持久化到本地 storage
// 这样「改价格 / 上传图片 / 增删菜品」都能在本机保存，刷新不丢

const mock = require('./mock.js');

const STORAGE_KEY = 'menu';

let _dishes = null; // 内存缓存

function clone(o) {
  return JSON.parse(JSON.stringify(o));
}

function load() {
  if (_dishes) return _dishes;
  let stored = wx.getStorageSync(STORAGE_KEY);
  if (!Array.isArray(stored) || !stored.length) {
    stored = clone(mock.dishes);
    wx.setStorageSync(STORAGE_KEY, stored);
  }
  _dishes = stored;
  return _dishes;
}

function persist() {
  wx.setStorageSync(STORAGE_KEY, _dishes);
}

// 规范化字段，保证页面渲染与算价安全
function normalize(d) {
  const supportSpicy = d.supportSpicy !== false;
  const supportPortion = d.supportPortion !== false;
  let price = Number(d.price);
  if (!isFinite(price) || price < 0) price = 0;
  let originalPrice = d.originalPrice == null ? null : Number(d.originalPrice);
  if (originalPrice == null || originalPrice <= price) {
    originalPrice = Math.round(price * 1.25);
  }
  const tags = Array.isArray(d.tags)
    ? d.tags
    : (d.tags ? String(d.tags).split(/[,，]/).map(s => s.trim()).filter(Boolean) : []);
  return Object.assign({}, d, {
    supportSpicy: supportSpicy,
    supportPortion: supportPortion,
    price: price,
    originalPrice: originalPrice,
    sales: Number(d.sales) || 0,
    rating: Number(d.rating) || 4.8,
    recommend: !!d.recommend,
    tags: tags,
    grad: Array.isArray(d.grad) && d.grad.length === 2 ? d.grad : ['#FFB088', '#FF7E5F'],
    emoji: d.emoji || '🍽️'
  });
}

function getDishes() {
  return load();
}

function getCategories() {
  return mock.categories;
}

function getDishById(id) {
  return load().find(d => d.id === id) || null;
}

function getByCat(catId) {
  return load().filter(d => d.cat === catId);
}

function getRecommend() {
  return load().filter(d => d.recommend).slice(0, 4);
}

function getHot() {
  return load().slice().sort((a, b) => b.sales - a.sales).slice(0, 6);
}

function genId() {
  return 'u' + Date.now().toString(36) + Math.floor(Math.random() * 1000).toString(36);
}

// 新增或更新（按 id 匹配，无 id 视为新增）
function upsertDish(dish) {
  load();
  const data = normalize(dish);
  if (!data.id) data.id = genId();
  const idx = _dishes.findIndex(d => d.id === data.id);
  if (idx >= 0) _dishes[idx] = data;
  else _dishes.unshift(data);
  persist();
  return data;
}

function deleteDish(id) {
  load();
  _dishes = _dishes.filter(d => d.id !== id);
  persist();
}

module.exports = {
  getDishes,
  getCategories,
  getDishById,
  getByCat,
  getRecommend,
  getHot,
  genId,
  upsertDish,
  deleteDish,
  normalize
};
