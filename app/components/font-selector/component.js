import Component from '@ember/component';

export default Component.extend({
  classNames: ['font-selector'],
  init() {
    this._super(...arguments);
    this.fonts = this.fonts || [];
  }
});
