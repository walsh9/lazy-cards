import Component from 'ember-component';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import computed, { readOnly } from 'ember-computed';
import on from 'ember-evented/on';
import { next } from 'ember-runloop';
import { EKMixin, keyDown } from 'ember-keyboard';
import modulo from '../../utils/modulo';

export default Component.extend(EKMixin, {
  keyboardActivated: readOnly('active'),
  keyboardPriority: 1,
  active: false,
  activeRow: 0,
  activeCol: 2,
  size: computed('text', function() {
   //console.log(get(this, 'text.length'));
  }),
  rowCount: readOnly('text.length'),
  actions: {
    startEditing() {
      set(this, 'activeRow', 0);
      set(this, 'active', true);
    },
    finishEditing() {
      set(this, 'activeRow', -1);
      set(this, 'active', false);
    },
    changeRow(row) {
      set(this, 'activeRow', row);
    },
    selectItem(row, col) {
      set(this, 'activeRow', row);
      set(this, 'activeCol', col);
    }
  },
  currentItem: computed('activeRow', 'activeCol', function() {
    let activeRow = get(this, 'activeRow');
    let activeCol = get(this, 'activeCol');
    let row = this.$(`.fancytext:nth-child(${activeRow + 1})`);
    let item = row.find(`:nth-child(${activeCol + 1})`);
    return item;
  }),
  selectDown: on(keyDown('ArrowDown'), function() {
    let activeRow = get(this, 'activeRow');
    let rowCount = get(this, 'rowCount');
    set(this, 'activeRow', modulo(activeRow + 1, rowCount));
    next(this, this.focusCurrentItem);
  }),
  selectUp: on(keyDown('ArrowUp'), function() {
    let activeRow = get(this, 'activeRow');
    let rowCount = get(this, 'rowCount');
    set(this, 'activeRow', modulo(activeRow - 1, rowCount));
    next(this, this.focusCurrentItem);
  }),
  selectLeft: on(keyDown('ArrowLeft'), function() {
    let activeCol = get(this, 'activeCol');
    if (activeCol === 2) {
      let input = get(this, 'currentItem');
      if (input[0].selectionStart > 0) {
        return false;
      }
    }
    let colCount = 3;
    set(this, 'activeCol', modulo(activeCol - 1, colCount));
    next(this, this.focusCurrentItem);
  }),
  selectRight: on(keyDown('ArrowRight'), function() {
    let activeCol = get(this, 'activeCol');
    if (activeCol === 2) {
      let input = get(this, 'currentItem');
      if (input[0].selectionEnd <= input.val().length - 1) {
        return false;
      }
    }
    let colCount = 3;
    set(this, 'activeCol', modulo(activeCol + 1, colCount));
    next(this, this.focusCurrentItem);
  }),
  selectEnter: on(keyDown('Enter'), function() {
    let activeCol = get(this, 'activeCol');
    if (activeCol === 2) {
      let activeRow = get(this, 'activeRow');
      let rowCount = get(this, 'rowCount');
      set(this, 'activeRow', modulo(activeRow + 1, rowCount));
      next(this, this.focusCurrentItem);
    }
  }),
  selectEscape: on(keyDown('Escape'), function() {
    this.sendAction('doneEditing');
  }),
  focusCurrentItem() {
    let item = get(this, 'currentItem');
    item.focus();
  }
});
