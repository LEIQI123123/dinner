const mock = require('../../utils/mock.js');

Component({
  properties: {
    show: { type: Boolean, value: false },
    dish: { type: Object, value: null }
  },

  data: {
    spicyOptions: mock.specs.spicy,
    portionOptions: mock.specs.portion,
    spicy: 1,
    portion: 'medium',
    quantity: 1,
    unitPrice: 0,
    totalPrice: 0
  },

  observers: {
    'show, dish': function (show, dish) {
      if (show && dish) {
        this.setData({
          spicy: dish.supportSpicy ? 1 : 0,
          // 不支持份量时不应用任何加价，默认中份(delta=0)，避免负单价
          portion: dish.supportPortion ? 'medium' : 'medium',
          quantity: 1
        }, () => this.recalc());
      }
    }
  },

  methods: {
    recalc() {
      const dish = this.data.dish;
      if (!dish) return;
      const portionOpt = this.data.portionOptions.find(p => p.code === this.data.portion);
      // 仅当菜品支持份量选择时才叠加份量差价
      const delta = (dish.supportPortion && portionOpt) ? portionOpt.delta : 0;
      const unitPrice = dish.price + delta;
      this.setData({
        unitPrice: unitPrice,
        totalPrice: unitPrice * this.data.quantity
      });
    },

    onPick(e) {
      const type = e.currentTarget.dataset.type;
      if (type === 'spicy') {
        this.setData({ spicy: e.currentTarget.dataset.level }, () => this.recalc());
      } else {
        this.setData({ portion: e.currentTarget.dataset.code }, () => this.recalc());
      }
    },

    onQty(e) {
      this.setData({ quantity: e.detail.value }, () => this.recalc());
    },

    onClose() {
      this.triggerEvent('close');
    },
    onMask() {
      this.triggerEvent('close');
    },
    noop() {},

    onConfirm() {
      const dish = this.data.dish;
      if (!dish) return;
      const item = {
        dishId: dish.id,
        name: dish.name,
        emoji: dish.emoji,
        grad: dish.grad,
        image: dish.image || '',
        supportSpicy: !!dish.supportSpicy,
        supportPortion: !!dish.supportPortion,
        spicyLevel: this.data.spicy,
        portion: this.data.portion,
        unitPrice: this.data.unitPrice,
        quantity: this.data.quantity
      };
      this.triggerEvent('confirm', { item: item });
    }
  }
});
