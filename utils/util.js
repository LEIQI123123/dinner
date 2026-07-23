// 通用工具

function genOrderNo() {
  const d = new Date();
  const pad = n => (n < 10 ? '0' + n : '' + n);
  const ymd = '' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate());
  const hms = pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
  const rand = Math.floor(Math.random() * 900 + 100);
  return 'ORD' + ymd + hms + rand;
}

function formatPrice(n) {
  const num = typeof n === 'number' ? n : parseFloat(n);
  if (isNaN(num)) return '¥0';
  const s = num.toFixed(2);
  return '¥' + s.replace(/\.00$/, '');
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 手机号校验
function isValidPhone(phone) {
  return /^1[3-9]\d{9}$/.test(String(phone).trim());
}

module.exports = { genOrderNo, formatPrice, deepClone, isValidPhone };
