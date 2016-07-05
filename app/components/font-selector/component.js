import Component from 'ember-component';

export default Component.extend({
  classNames: ['fontselector'],
  fonts: [],
  actions: {
    click(font) {
      this.sendAction('selectFont', font);
    }
  }
});
