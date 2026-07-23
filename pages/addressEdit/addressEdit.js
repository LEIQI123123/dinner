const addrUtil = require('../../utils/address.js');
const util = require('../../utils/util.js');

Page({
  data: {
    id: '',
    name: '',
    phone: '',
    address: '',
    tag: '家',
    tags: ['家', '公司', '学校', '其他'],
    isEdit: false
  },

  onLoad(options) {
    if (options.id) {
      const app = getApp();
      const addr = app.globalData.addresses.find(a => a.id === options.id);
      if (addr) {
        this.setData({
          id: addr.id,
          name: addr.name,
          phone: addr.phone,
          address: addr.address,
          tag: addr.tag,
          isEdit: true
        });
      }
    }
  },

  onName(e) { this.setData({ name: e.detail.value }); },
  onPhone(e) { this.setData({ phone: e.detail.value }); },
  onAddress(e) { this.setData({ address: e.detail.value }); },

  pickTag(e) {
    this.setData({ tag: e.currentTarget.dataset.tag });
  },

  save() {
    const d = this.data;
    if (!d.name.trim()) { wx.showToast({ title: '请填写收货人', icon: 'none' }); return; }
    if (!util.isValidPhone(d.phone)) { wx.showToast({ title: '手机号格式不对', icon: 'none' }); return; }
    if (!d.address.trim()) { wx.showToast({ title: '请填写详细地址', icon: 'none' }); return; }

    const app = getApp();
    const payload = { name: d.name.trim(), phone: d.phone.trim(), address: d.address.trim(), tag: d.tag };
    let list;
    if (d.isEdit) {
      list = addrUtil.update(app.globalData.addresses, Object.assign({ id: d.id }, payload));
    } else {
      list = addrUtil.add(app.globalData.addresses, payload);
    }
    app.globalData.addresses = list;
    wx.showToast({ title: '已保存', icon: 'success' });
    setTimeout(() => wx.navigateBack(), 600);
  }
});
