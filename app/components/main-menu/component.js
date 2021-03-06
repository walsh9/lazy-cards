import Component from 'ember-component';
import computed from 'ember-computed';
import get from 'ember-metal/get';

export default Component.extend({
  options: computed('selectedFace', 'settings', function() {
    let selectedFace = get(this, 'selectedFace');
    if (selectedFace === 'front') {
      return [
        { label: 'Choose Graphic',      value: ['openEmojiSelector'] },
        { label: 'Change Graphic Size', value: ['toggleGraphicSize'] },
        //{ label: 'Edit Graphic Layout', value: [] },
        { label: 'Choose Border',       value: ['openBorderSelector'] },
        { label: 'Edit Text',           value: ['setEditMode', 'text'] },
        { label: 'Choose Font',         value: ['openFontSelector'] },
        { label: 'Go to Inside >',      value: ['setFace', 'inside'] },
        { label: 'Print',               value: ['print'] },
      ];
    } else {
      return [
        { label: 'Choose Graphic',      value: ['openEmojiSelector'] },
        { label: 'Change Graphic Size', value: ['toggleGraphicSize'] },
        //{ label: 'Edit Graphic Layout', value: [] },
        { label: 'Choose Border',       value: ['openBorderSelector'] },
        { label: 'Edit Text',           value: ['setEditMode', 'text'] },
        { label: 'Choose Font',         value: ['openFontSelector'] },
        { label: '< Go to Front',       value: ['setFace', 'front'] },
        { label: 'Print',               value: ['print'] },
      ];
    }
  }),
});
