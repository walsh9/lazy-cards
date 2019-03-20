import Component from '@ember/component';

export default Component.extend({
  classNames: ['border-selector'],
  init() {
    this._super(...arguments);
    this.borders = this.borders || [];
  }
});
