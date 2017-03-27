import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    chooseCategory(category) {
      console.log(category);
      this.sendAction('selectCategory', category);
    }
  }
});
