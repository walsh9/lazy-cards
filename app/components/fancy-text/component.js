import Component from '@ember/component';
import { computed } from '@ember/object';
import { set } from '@ember/object';
import { get } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { next } from '@ember/runloop';

export default Component.extend({
  isEditing: false,
  classNames: ['fancytext'],
  classNameBindings: ['textClasses', 'active'],
  active: null,
  text: null,
  index: null,
  textClasses: computed('text.{size,align,style}', function() {
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
      large: '64px'
    };
    return anchorY[size];
  }),
  actions: {
    startedEditing() {
      set(this, 'isEditing', true);
      next(() => {this.$('.fancytext-input')[0].focus();});
    },
    toggleFontSize() {
      let size = get(this, 'text.size');
      if (size === 'large') {
        set(this, 'text.size', 'small');
      } else if (size === 'small') {
        set(this, 'text.size', 'medium');
      } else {
        set(this, 'text.size', 'large');
      }
      this.sendAction('select', get(this, 'index'), 1);
    },
    toggleFontAlign() {
      let align = get(this, 'text.align');
      if (align === 'left') {
        set(this, 'text.align', 'center');
      } else if (align === 'center') {
        set(this, 'text.align', 'right');
      } else {
        set(this, 'text.align', 'left');
      }
      this.sendAction('select', get(this, 'index'), 0);
    },
    change(event) {
      let newText = Object.assign(
        {},
        get(this, 'text'),
        {contents: event.target.value}
      );
      let index = get(this, 'index');
      this.sendAction('updateText', index, newText);
    },
    selectTextInput() {
      let index = get(this, 'index');
      this.sendAction('select', index, 2);
    }
  }
});
