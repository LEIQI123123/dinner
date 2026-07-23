// 购物车纯函数操作（key 唯一标识一个行项：菜品+辣度+份量）

function makeKey(dishId, spicyLevel, portion) {
  return [dishId, spicyLevel, portion].join('_');
}

function addToCart(cart, item) {
  const spicyLevel = item.spicyLevel != null ? item.spicyLevel : 1;
  const portion = item.portion || 'medium';
  const key = makeKey(item.dishId, spicyLevel, portion);
  const unitPrice = item.unitPrice != null ? item.unitPrice : item.price;

  const exist = cart.find(i => i.key === key);
  if (exist) {
    return cart.map(i =>
      i.key === key
        ? Object.assign({}, i, { quantity: i.quantity + (item.quantity || 1) })
        : i
    );
  }

  const newItem = {
    key: key,
    dishId: item.dishId,
    name: item.name,
    emoji: item.emoji,
    grad: item.grad,
    spicyLevel: spicyLevel,
    portion: portion,
    unitPrice: unitPrice,
    quantity: item.quantity || 1
  };
  return cart.concat([newItem]);
}

function updateQty(cart, key, qty) {
  if (qty <= 0) return removeItem(cart, key);
  return cart.map(i =>
    i.key === key ? Object.assign({}, i, { quantity: qty }) : i
  );
}

function removeItem(cart, key) {
  return cart.filter(i => i.key !== key);
}

function clearCart() {
  return [];
}

module.exports = { makeKey, addToCart, updateQty, removeItem, clearCart };
