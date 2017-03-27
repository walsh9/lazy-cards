import Component from 'ember-component';

export default Component.extend({
  classNames: ['fontselector'],
  fonts: [],
  actions: {
    chooseFont(font) {
      this.sendAction('selectFont', font);
    }
  }
});
