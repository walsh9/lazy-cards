import Component from 'ember-component';
import computed, { readOnly } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';

export default Component.extend({
  classNames: ['cardface'],
  classNameBindings: ['isSelected:cardface--selected', 'borderClass'],
  data: null,
  isSelected: null,
  graphic: readOnly('data.graphic'),
  font: readOnly('data.font'),
  border: readOnly('data.border'),
  borderClass: computed('data.border', function() {
    let border = get(this, 'data.border').dasherize();
    return htmlSafe(`border--${border}`);
  }),
  graphicUrl: computed('graphic', function() {
    let graphic = get(this, 'graphic');
    if (graphic) {
      return `/assets/png_512x512/${get(graphic, 'unicode')}.png`;
    }
    return '';
  }),
});
