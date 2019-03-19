import Component from '@ember/component';

export default Component.extend({
  classNames: ['border-selector'],
  borders: [],
  actions: {
    chooseBorder(border) {
      this.sendAction('selectBorder', border);
    }
  }
});
