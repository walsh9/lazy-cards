import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';
import Page from '../../lib/page';
import { borders, fonts } from '../../lib/settings';
import { next } from 'ember-runloop';

export default Component.extend({
  frontData: null,
  insideData: null,
  classNames: ['card-creator'],
  classNameBindings: ['editMode:card-creator--editing'],
  selectedFace: 'front',
  openModal: null,
  editMode: null,
  helpText: computed('editMode', function() {
    let editMode = get(this, 'editMode');
    let defaultHelp = '[↑],[↓]: Select, [Enter]: Choose Item';
    return {
      text: '[→],[←],[↑],[↓]: Select, [Enter]: Change Option, [Esc]: Back/Done',
      graphic: '[→],[←],[↑],[↓]: Select, [Enter]: Toggle Graphic, [Esc]: Back/Done',
    }[editMode] || defaultHelp;
  }),
  borders,
  fonts,
  init() {
    this._super(...arguments);
    set(this, 'frontData', Page.create());
    set(this, 'insideData', Page.create());
  },
  actions: {
    mainmenuSelect(item) {
      this.send(...get(item, 'value'));
    },
    openBorderSelector() {
      set(this, 'openModal', 'border-selector');
    },
    openEmojiSelector() {
      set(this, 'openModal', 'emoji-selector');
    },
    toggleGraphicSize() {
      let selectedFace = get(this, 'selectedFace');
      let graphicSize = get(this, selectedFace + 'Data.graphicSize');
      if (graphicSize === 'big') {
        set(this, selectedFace + 'Data.graphicSize', 'medium');
      } else if (graphicSize === 'medium') {
        set(this, selectedFace + 'Data.graphicSize', 'little');
      } else {
        set(this, selectedFace + 'Data.graphicSize', 'big');
      }
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
    setEditMode(mode) {
      set(this, 'editMode', mode);
    },
    endEditMode() {
      set(this, 'editMode', null);
    },
    setText(index, text) {
      let selectedFace = get(this, 'selectedFace');
      let textList = get(this, selectedFace + 'Data.text');
      next(function() {textList.replace(index, 1, text);});
    },
    closeModal() {
      set(this, 'openModal', null);
    },
    print() {
      window.print();
    }
  }
});
