import Component from '@ember/component';

export default Component.extend({
  classNames: ['font-selector'],
  fonts: [],
  actions: {
    chooseFont(font) {
      this.sendAction('selectFont', font);
    }
  }
});
