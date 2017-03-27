import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['border-selector'],
  borders: [],
  actions: {
    chooseBorder(border) {
      this.sendAction('selectBorder', border);
    }
  }
});
