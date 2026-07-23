// ===== 综合餐饮 mock 数据 =====

const categories = [
  { id: 'signature', name: '招牌', icon: '👑' },
  { id: 'stirfry', name: '炒菜', icon: '🍳' },
  { id: 'staple', name: '主食', icon: '🍚' },
  { id: 'soup', name: '汤品', icon: '🍲' },
  { id: 'drink', name: '饮品', icon: '🥤' },
  { id: 'dessert', name: '甜点', icon: '🍰' }
];

// 辣度 / 份量规格
const specs = {
  spicy: [
    { level: 0, label: '不辣', emoji: '🙂' },
    { level: 1, label: '微辣', emoji: '🌶️' },
    { level: 2, label: '中辣', emoji: '🌶️🌶️' },
    { level: 3, label: '特辣', emoji: '🌶️🔥' }
  ],
  portion: [
    { code: 'small', label: '小份', delta: -6 },
    { code: 'medium', label: '中份', delta: 0 },
    { code: 'large', label: '大份', delta: 8 }
  ]
};

// 促销活动
const banners = [
  { id: 'b1', title: '满 88 减 20', sub: '限时狂欢', grad: ['#FFD54F', '#FF7E5F'], emoji: '🎉' },
  { id: 'b2', title: '新客首单立减 8 元', sub: '新人专享', grad: ['#FFB088', '#FF9A8B'], emoji: '🎁' }
];

const fullReductions = [
  { threshold: 30, reduce: 5 },
  { threshold: 50, reduce: 10 },
  { threshold: 88, reduce: 20 }
];

const promos = {
  banners: banners,
  fullReductions: fullReductions,
  freeDeliveryThreshold: 30,
  deliveryFee: 5
};

const addresses = [
  { id: 'addr001', name: '小暖', phone: '13800001234', address: '幸福路 88 号暖暖小区 3 栋 502', tag: '家', isDefault: true },
  { id: 'addr002', name: '小暖', phone: '13800001234', address: '科技园南区 12 栋创新大厦 15F', tag: '公司', isDefault: false }
];

const dishes = [
  // ===== 招牌 =====
  { id: 'd001', name: '招牌红烧肉', cat: 'signature', emoji: '🍖', grad: ['#FFB088', '#FF7E5F'], price: 38, desc: '肥瘦相间，慢炖入味，配秘制酱汁', tags: ['招牌', '人气'], sales: 328, rating: 4.8, recommend: true },
  { id: 'd002', name: '糖醋排骨', cat: 'signature', emoji: '🍖', grad: ['#FFD194', '#FF9A8B'], price: 36, desc: '酸甜可口，外酥里嫩', tags: ['招牌'], sales: 256, rating: 4.7 },
  { id: 'd003', name: '蜜汁叉烧', cat: 'signature', emoji: '🍖', grad: ['#FFCBA4', '#FF8C69'], price: 42, desc: '蜜汁包裹，香甜不腻', tags: ['人气'], sales: 198, rating: 4.9, recommend: true },
  { id: 'd004', name: '酱牛肉', cat: 'signature', emoji: '🥩', grad: ['#FFC371', '#FF5F6D'], price: 45, desc: '卤香浓郁，肉质紧实', tags: ['下酒'], sales: 142, rating: 4.6 },
  { id: 'd005', name: '红烧狮子头', cat: 'signature', emoji: '🧆', grad: ['#F6D365', '#FDA085'], price: 32, desc: '个大饱满，鲜嫩多汁', tags: ['招牌'], sales: 176, rating: 4.7 },
  { id: 'd006', name: '照烧鸡腿', cat: 'signature', emoji: '🍗', grad: ['#FFAFBD', '#FFC3A0'], price: 34, desc: '照烧酱汁，皮脆肉嫩', tags: ['人气'], sales: 289, rating: 4.8, recommend: true },
  { id: 'd007', name: '清蒸鲈鱼', cat: 'signature', emoji: '🐟', grad: ['#FFB088', '#FF7E5F'], price: 48, desc: '原汁原味，鲜嫩滑爽', tags: ['清淡'], sales: 154, rating: 4.9, spicy: false },

  // ===== 炒菜 =====
  { id: 'd101', name: '宫保鸡丁', cat: 'stirfry', emoji: '🥘', grad: ['#FFD194', '#FF9A8B'], price: 28, desc: '鸡肉鲜嫩，花生香脆', tags: ['经典', '微辣'], sales: 421, rating: 4.8, recommend: true },
  { id: 'd102', name: '鱼香肉丝', cat: 'stirfry', emoji: '🥡', grad: ['#FFCBA4', '#FF8C69'], price: 26, desc: '酸甜微辣，下饭神器', tags: ['经典'], sales: 367, rating: 4.7 },
  { id: 'd103', name: '青椒肉丝', cat: 'stirfry', emoji: '🫑', grad: ['#FFC371', '#FF5F6D'], price: 26, desc: '清爽不腻，咸鲜适口', tags: ['家常'], sales: 233, rating: 4.6 },
  { id: 'd104', name: '西红柿炒蛋', cat: 'stirfry', emoji: '🍅', grad: ['#F6D365', '#FDA085'], price: 18, desc: '酸甜开胃，老少皆宜', tags: ['招牌'], sales: 512, rating: 4.9, spicy: false },
  { id: 'd105', name: '麻婆豆腐', cat: 'stirfry', emoji: '🌶️', grad: ['#FFAFBD', '#FFC3A0'], price: 20, desc: '麻辣鲜香，嫩滑入味', tags: ['招牌', '麻辣'], sales: 398, rating: 4.8, recommend: true },
  { id: 'd106', name: '干煸四季豆', cat: 'stirfry', emoji: '🫛', grad: ['#FFB088', '#FF7E5F'], price: 22, desc: '干香爽脆，蒜香浓郁', tags: ['素菜'], sales: 201, rating: 4.7 },
  { id: 'd107', name: '蒜蓉西兰花', cat: 'stirfry', emoji: '🥦', grad: ['#FFD194', '#FF9A8B'], price: 20, desc: '清脆爽口，蒜香清新', tags: ['素菜', '清淡'], sales: 188, rating: 4.8, spicy: false },
  { id: 'd108', name: '回锅肉', cat: 'stirfry', emoji: '🥓', grad: ['#FFCBA4', '#FF8C69'], price: 30, desc: '肥而不腻，香辣下饭', tags: ['川味'], sales: 276, rating: 4.7 },

  // ===== 主食 =====
  { id: 'd201', name: '香米饭', cat: 'staple', emoji: '🍚', grad: ['#F6D365', '#FDA085'], price: 3, desc: '粒粒饱满，软糯喷香', tags: ['必备'], sales: 999, rating: 4.9, spicy: false, portion: false },
  { id: 'd202', name: '黄金蛋炒饭', cat: 'staple', emoji: '🍳', grad: ['#FFC371', '#FF5F6D'], price: 16, desc: '粒粒金黄，蛋香浓郁', tags: ['人气'], sales: 445, rating: 4.8, recommend: true },
  { id: 'd203', name: '红烧牛肉面', cat: 'staple', emoji: '🍜', grad: ['#FFAFBD', '#FFC3A0'], price: 28, desc: '汤浓面劲，牛肉软烂', tags: ['招牌'], sales: 389, rating: 4.8 },
  { id: 'd204', name: '阳春面', cat: 'staple', emoji: '🍜', grad: ['#FFB088', '#FF7E5F'], price: 14, desc: '清汤细面，清爽暖胃', tags: ['清淡'], sales: 210, rating: 4.6, spicy: false },
  { id: 'd205', name: '鲜肉小笼包', cat: 'staple', emoji: '🥟', grad: ['#FFD194', '#FF9A8B'], price: 22, desc: '皮薄汁多，一口爆汁', tags: ['人气'], sales: 334, rating: 4.9, portion: false, spicy: false },
  { id: 'd206', name: '香煎饺', cat: 'staple', emoji: '🥟', grad: ['#FFCBA4', '#FF8C69'], price: 20, desc: '底脆馅鲜，金黄诱人', tags: ['招牌'], sales: 256, rating: 4.7, portion: false, spicy: false },
  { id: 'd207', name: '葱油饼', cat: 'staple', emoji: '🫓', grad: ['#FFC371', '#FF5F6D'], price: 12, desc: '外酥里软，葱香四溢', tags: ['小吃'], sales: 198, rating: 4.6, portion: false, spicy: false },

  // ===== 汤品 =====
  { id: 'd301', name: '番茄蛋汤', cat: 'soup', emoji: '🍲', grad: ['#F6D365', '#FDA085'], price: 12, desc: '酸甜暖身，蛋花柔滑', tags: ['家常'], sales: 267, rating: 4.7, portion: false, spicy: false },
  { id: 'd302', name: '排骨玉米汤', cat: 'soup', emoji: '🍲', grad: ['#FFAFBD', '#FFC3A0'], price: 22, desc: '清甜滋补，玉米清甜', tags: ['滋补'], sales: 178, rating: 4.8, recommend: true, portion: false, spicy: false },
  { id: 'd303', name: '紫菜蛋花汤', cat: 'soup', emoji: '🥣', grad: ['#FFB088', '#FF7E5F'], price: 10, desc: '鲜香清淡，一口暖胃', tags: ['清淡'], sales: 221, rating: 4.6, portion: false, spicy: false },
  { id: 'd304', name: '酸辣汤', cat: 'soup', emoji: '🥣', grad: ['#FFD194', '#FF9A8B'], price: 14, desc: '酸辣开胃，料足味浓', tags: ['开胃'], sales: 193, rating: 4.7, portion: false, recommend: true },
  { id: 'd305', name: '冬瓜排骨汤', cat: 'soup', emoji: '🍲', grad: ['#FFCBA4', '#FF8C69'], price: 20, desc: '清热去火，汤鲜肉烂', tags: ['滋补'], sales: 156, rating: 4.8, portion: false, spicy: false },

  // ===== 饮品 =====
  { id: 'd401', name: '冰镇可乐', cat: 'drink', emoji: '🥤', grad: ['#FFC371', '#FF5F6D'], price: 8, desc: '气泡十足，冰爽畅快', tags: ['经典'], sales: 612, rating: 4.8, portion: false, spicy: false },
  { id: 'd402', name: '雪碧', cat: 'drink', emoji: '🥤', grad: ['#F6D365', '#FDA085'], price: 8, desc: '清爽柠檬味，解腻首选', tags: ['经典'], sales: 489, rating: 4.7, portion: false, spicy: false },
  { id: 'd403', name: '鲜榨橙汁', cat: 'drink', emoji: '🍊', grad: ['#FFAFBD', '#FFC3A0'], price: 15, desc: '现榨无添加，维C满满', tags: ['健康'], sales: 234, rating: 4.9, recommend: true, portion: false, spicy: false },
  { id: 'd404', name: '蜂蜜柠檬茶', cat: 'drink', emoji: '🍋', grad: ['#FFB088', '#FF7E5F'], price: 14, desc: '酸甜回甘，清爽解腻', tags: ['人气'], sales: 301, rating: 4.8, portion: false, spicy: false },
  { id: 'd405', name: '珍珠奶茶', cat: 'drink', emoji: '🧋', grad: ['#FFD194', '#FF9A8B'], price: 18, desc: 'Q弹珍珠，香浓奶香', tags: ['招牌'], sales: 567, rating: 4.9, recommend: true, portion: false, spicy: false },
  { id: 'd406', name: '古法酸梅汤', cat: 'drink', emoji: '🧉', grad: ['#FFCBA4', '#FF8C69'], price: 12, desc: '生津止渴，解暑良品', tags: ['古法'], sales: 188, rating: 4.7, portion: false, spicy: false },

  // ===== 甜点 =====
  { id: 'd501', name: '草莓奶油蛋糕', cat: 'dessert', emoji: '🍰', grad: ['#FFAFBD', '#FFC3A0'], price: 28, desc: '绵软蛋糕，草莓酸甜', tags: ['人气'], sales: 312, rating: 4.9, recommend: true, portion: false, spicy: false },
  { id: 'd502', name: '焦糖布丁', cat: 'dessert', emoji: '🍮', grad: ['#FFC371', '#FF5F6D'], price: 18, desc: '滑嫩布丁，焦糖微苦', tags: ['招牌'], sales: 245, rating: 4.8, portion: false, spicy: false },
  { id: 'd503', name: '香草冰淇淋', cat: 'dessert', emoji: '🍦', grad: ['#F6D365', '#FDA085'], price: 16, desc: '奶香浓郁，入口即化', tags: ['经典'], sales: 276, rating: 4.7, portion: false, spicy: false },
  { id: 'd504', name: '招牌双皮奶', cat: 'dessert', emoji: '🍶', grad: ['#FFB088', '#FF7E5F'], price: 14, desc: '细腻嫩滑，奶香醇厚', tags: ['招牌'], sales: 298, rating: 4.9, portion: false, spicy: false },
  { id: 'd505', name: '提拉米苏', cat: 'dessert', emoji: '🍰', grad: ['#FFD194', '#FF9A8B'], price: 30, desc: '咖啡酒香，层次丰富', tags: ['人气'], sales: 167, rating: 4.8, portion: false, spicy: false },
  { id: 'd506', name: '红豆沙', cat: 'dessert', emoji: '🍧', grad: ['#FFCBA4', '#FF8C69'], price: 12, desc: '绵密香甜，暖心暖胃', tags: ['经典'], sales: 203, rating: 4.7, portion: false, spicy: false }
];

// 补全缺省字段
dishes.forEach(d => {
  if (d.supportSpicy === undefined) d.supportSpicy = (d.spicy !== false);
  if (d.supportPortion === undefined) d.supportPortion = (d.portion !== false);
  d.recommend = !!d.recommend;
  if (d.originalPrice == null) d.originalPrice = Math.round(d.price * 1.25);
});

function getDishById(id) {
  return dishes.find(d => d.id === id);
}

function getCategoryById(id) {
  return categories.find(c => c.id === id);
}

module.exports = {
  categories,
  specs,
  promos,
  addresses,
  dishes,
  getDishById,
  getCategoryById
};
