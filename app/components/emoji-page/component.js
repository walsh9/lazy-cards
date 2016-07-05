import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    click(emoji) {
      this.sendAction('selectEmoji', emoji);
    }
  }
});
