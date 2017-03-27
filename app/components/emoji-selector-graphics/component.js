import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    chooseEmoji(emoji) {
      this.sendAction('selectEmoji', emoji);
    }
  }
});
