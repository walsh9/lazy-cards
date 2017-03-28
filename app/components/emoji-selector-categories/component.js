import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    chooseCategory(category) {
      this.sendAction('selectCategory', category);
    }
  }
});
