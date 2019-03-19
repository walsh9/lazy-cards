import Component from '@ember/component';

export default Component.extend({
  actions: {
    chooseEmoji(emoji) {
      this.sendAction('selectEmoji', emoji);
    }
  }
});
