// 价格与优惠计算

function calcSubtotal(cart) {
  return cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
}

function calcDiscount(subtotal, fullReductions) {
  let best = 0;
  (fullReductions || []).forEach(r => {
    if (subtotal >= r.threshold && r.reduce > best) best = r.reduce;
  });
  return best;
}

// 下一档优惠提示：再买 X 元减 Y
function nextDiscountTip(subtotal, fullReductions, freeDeliveryThreshold) {
  const sorted = (fullReductions || []).slice().sort((a, b) => a.threshold - b.threshold);
  for (const r of sorted) {
    if (subtotal < r.threshold) {
      return { nextReduce: r.reduce, needPay: r.threshold - subtotal };
    }
  }
  if (subtotal < freeDeliveryThreshold) {
    return { nextReduce: 0, needPay: freeDeliveryThreshold - subtotal, freeTip: true };
  }
  return null;
}

function calcDelivery(subtotalAfterDiscount, promo) {
  if (!promo) return 0;
  return subtotalAfterDiscount >= promo.freeDeliveryThreshold ? 0 : promo.deliveryFee;
}

// 汇总：subtotal / discount / deliveryFee / total / tip
function calc(cart, promo) {
  const subtotal = calcSubtotal(cart);
  const discount = calcDiscount(subtotal, promo ? promo.fullReductions : []);
  const afterDiscount = subtotal - discount;
  const deliveryFee = calcDelivery(afterDiscount, promo);
  const total = afterDiscount + deliveryFee;
  const tip = nextDiscountTip(
    subtotal,
    promo ? promo.fullReductions : [],
    promo ? promo.freeDeliveryThreshold : 0
  );
  return { subtotal, discount, deliveryFee, total, tip };
}

module.exports = {
  calcSubtotal,
  calcDiscount,
  calcDelivery,
  calc,
  nextDiscountTip
};
