import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import Page from '../../lib/page';
import { borders, fonts } from '../../lib/settings';

export default Component.extend({
  frontData: null,
  insideData: null,
  selectedFace: 'front',
  openModal: null,
  borders,
  fonts,
  init() {
    this._super(...arguments);
    set(this, 'frontData', Page.create());
    set(this, 'insideData', Page.create());
  },
  actions: {
    openBorderSelector() {
      set(this, 'openModal', 'border-selector');
    },
    openEmojiSelector() {
      set(this, 'openModal', 'emoji-selector');
    },
    openFontSelector() {
      set(this, 'openModal', 'font-selector');
    },
    setBorder(border) {
      let selectedFace = get(this, 'selectedFace');
      set(this, selectedFace + 'Data.border', border);
      this.send('closeModal');
    },
    setEmoji(emoji) {
      let selectedFace = get(this, 'selectedFace');
      set(this, selectedFace + 'Data.graphic', emoji);
      this.send('closeModal');
    },
    setFont(font) {
      let selectedFace = get(this, 'selectedFace');
      set(this, selectedFace + 'Data.font', font);
      this.send('closeModal');
    },
    setFace(face) {
      set(this, 'selectedFace', face);
    },
    setText(index, text) {
      let selectedFace = get(this, 'selectedFace');
      let textList = get(this, selectedFace + 'Data.text');
      textList.replace(index, 1, text);
    },
    closeModal() {
      set(this, 'openModal', null);
    },
    print() {
      window.print();
    }
  }
});
