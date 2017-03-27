import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['borderselector'],
  borders: [],
  actions: {
    chooseBorder(border) {
      this.sendAction('selectBorder', border);
    }
  }
});
