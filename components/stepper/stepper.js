Component({
  properties: {
    value: { type: Number, value: 1 },
    min: { type: Number, value: 1 },
    max: { type: Number, value: 99 }
  },
  methods: {
    dec() {
      if (this.data.value <= this.data.min) return;
      this.triggerEvent('change', { value: this.data.value - 1 });
    },
    inc() {
      if (this.data.value >= this.data.max) return;
      this.triggerEvent('change', { value: this.data.value + 1 });
    }
  }
});
