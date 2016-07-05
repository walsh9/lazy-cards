import Component from 'ember-component';
import computed from 'ember-computed';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import { htmlSafe } from 'ember-string';
import { next } from 'ember-runloop';

export default Component.extend({
  isEditing: false,
  classNames: ['fancytext'],
  text: null,
  index: null,
  textClasses: computed('text.size', 'text.align', 'text.style', function() {
    let {size, align, style} = get(this, 'text');
    let classes = `text-size--${size} text-align--${align} text-style--${style}`;
    return htmlSafe(classes);
  }),
  textAnchorX: computed('text.align', function() {
    let align = get(this, 'text.align');
    let anchorX = {
      left: '0',
      center: '50%',
      right: '100%'
    };
    return anchorX[align];
  }),
  textAnchorY: computed('text.size', function() {
    let size = get(this, 'text.size');
    let anchorY = {
      small: '32px',
      medium: '48px',
      large: '60px'
    };
    return anchorY[size];
  }),
  actions: {
    startedEditing() {
      set(this, 'isEditing', true);
      next(() => {this.$('.fancytext-input').focus();});
    },
    doneEditing(event) {
      if (get(this, 'isEditing')) {
        let newText = Object.assign(
          {},
          get(this, 'text'),
          {contents: event.target.value}
        );
        let index = get(this, 'index');
        set(this, 'isEditing', false);
        this.sendAction('updateText', index, newText);
      }
    }
  }
});
