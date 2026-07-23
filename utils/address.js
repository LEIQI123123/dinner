// 地址 CRUD（持久化到本地缓存）

function save(list) {
  wx.setStorageSync('addresses', list);
}

function add(list, addr) {
  const id = 'addr' + Date.now();
  const next = list.concat([Object.assign({ id: id, isDefault: false }, addr)]);
  save(next);
  return next;
}

function update(list, addr) {
  const next = list.map(a => (a.id === addr.id ? Object.assign({}, a, addr) : a));
  save(next);
  return next;
}

function remove(list, id) {
  const next = list.filter(a => a.id !== id);
  save(next);
  return next;
}

function setDefault(list, id) {
  const next = list.map(a => Object.assign({}, a, { isDefault: a.id === id }));
  save(next);
  return next;
}

module.exports = { save, add, update, remove, setDefault };
