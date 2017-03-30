import Component from 'ember-component';
import computed, { readOnly } from 'ember-computed';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import service from 'ember-service/inject';

export default Component.extend({
  assetMap: service('asset-map'),
  classNames: ['cardface'],
  classNameBindings: ['isSelected:cardface--selected', 'borderClass'],
  data: null,
  isSelected: null,
  graphic:         readOnly('data.graphic'),
  font:            readOnly('data.font'),
  border:          readOnly('data.border'),
  borderClass: computed('data.border', function() {
    let border = get(this, 'data.border').dasherize();
    return htmlSafe(`border--${border}`);
  }),
  size: readOnly('data.graphicSize'),
  graphicCount: computed('size', function() {
    let countMap = {
      'big':    1,
      'medium': 5,
      'little': 13,
    };
    return countMap[get(this, 'size')];
  }),
  graphicSize: computed('size', function() {
    let sizeMap = {
      'big':    300,
      'medium': 150,
      'little': 75,
    };
    return sizeMap[get(this, 'size')];
  }),
  graphics: computed('graphicCount', function() {
    let graphicCount = get(this, 'graphicCount');
    let graphicArray = [];
    for(let i = 0; i < graphicCount; i++) {
      graphicArray.push(true);
    }
    return graphicArray;
  }),
  graphicUrl: computed('graphic', function() {
    let graphic = get(this, 'graphic');
    if (graphic) {
      let url =`assets/png_512x512/${get(graphic, 'unicode')}.png`;
      return this.get('assetMap').resolve(url);
    }
    return '';
  }),
});
