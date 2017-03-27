import EmberObject from 'ember-object';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import TextRow from './text-row';

const defaults = {
  graphic:         null,
  graphicSize:     'big',
  font:            'Coustard',
  border:          'thin',
  numRows:         7,
  textOptions: {
    size:     'medium',
    align:    'center',
    style:    'normal',
    contents: ''
  }
};

export default EmberObject.extend({
  init: function(options = {}) {
    let settings = Object.assign({}, defaults, options);
    set(this, 'graphic',         settings.graphic);
    set(this, 'graphicSize',     settings.graphicSize);
    set(this, 'font',            settings.font);
    set(this, 'border',          settings.border);
    set(this, 'text',            []);
    for(let i = 0; i < settings.numRows; i++) {
      get(this, 'text').pushObject(TextRow.create(settings.textOptions));
    }
  }
});
