import Component from '@ember/component';

export default Component.extend({
  actions: {
    chooseCategory(category) {
      this.sendAction('selectCategory', category);
    }
  }
});
