import EmberObject from 'ember-object';
import set from 'ember-metal/set';

const defaults = {
  size:     'medium',
  align:    'center',
  style:    'normal',
  contents: ''
};

export default EmberObject.extend({
  init: function(options = {}) {
    let settings = Object.assign({}, defaults, options);
    set(this, 'size',     settings.size);
    set(this, 'align',    settings.align);
    set(this, 'style',    settings.style);
    set(this, 'contents', settings.contents);
  }
});
