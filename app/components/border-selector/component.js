import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['borderselector'],
  borders: [],
  actions: {
    click(border) {
      this.sendAction('selectBorder', border);
    }
  }
});
