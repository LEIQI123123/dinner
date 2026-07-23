Component({
  properties: {
    dish: Object,
    mode: { type: String, value: 'list' }
  },
  methods: {
    onTap() {
      this.triggerEvent('select', { id: this.data.dish.id });
    }
  }
});
