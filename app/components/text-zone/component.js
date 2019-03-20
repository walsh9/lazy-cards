import Component from '@ember/component';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { on } from '@ember/object/evented';
import { next } from '@ember/runloop';
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
  focusOut() {
    if (document.activeElement === document.body) {
      this.focusCurrentItem();
    }
  },
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
      this.focusCurrentItem();
    }
  },
  currentItem: computed('activeRow', 'activeCol', function() {
    let activeRow = this.activeRow;
    let activeCol = this.activeCol;
    let row = this.$(`.fancytext:nth-child(${activeRow + 1})`);
    let item = row.find(`:nth-child(${activeCol + 1})`);
    return item;
  }),
  selectDown: on(keyDown('ArrowDown'), function() {
    let activeRow = this.activeRow;
    let rowCount = this.rowCount;
    set(this, 'activeRow', modulo(activeRow + 1, rowCount));
    next(this, this.focusCurrentItem);
  }),
  selectUp: on(keyDown('ArrowUp'), function() {
    let activeRow = this.activeRow;
    let rowCount = this.rowCount;
    set(this, 'activeRow', modulo(activeRow - 1, rowCount));
    next(this, this.focusCurrentItem);
  }),
  selectLeft: on(keyDown('ArrowLeft'), function() {
    let activeCol = this.activeCol;
    if (activeCol === 2) {
      let input = this.currentItem;
      if (input[0].selectionStart > 0) {
        return false;
      }
    }
    let colCount = 3;
    set(this, 'activeCol', modulo(activeCol - 1, colCount));
    next(this, this.focusCurrentItem);
  }),
  selectRight: on(keyDown('ArrowRight'), function() {
    let activeCol = this.activeCol;
    if (activeCol === 2) {
      let input = this.currentItem;
      if (input[0].selectionEnd <= input.val().length - 1) {
        return false;
      }
    }
    let colCount = 3;
    set(this, 'activeCol', modulo(activeCol + 1, colCount));
    next(this, this.focusCurrentItem);
  }),
  selectEnter: on(keyDown('Enter'), function() {
    let activeCol = this.activeCol;
    if (activeCol === 2) {
      let activeRow = this.activeRow;
      let rowCount = this.rowCount;
      set(this, 'activeRow', modulo(activeRow + 1, rowCount));
      next(this, this.focusCurrentItem);
    }
  }),
  selectEscape: on(keyDown('Escape'), function() {
    this.doneEditing();
  }),
  focusCurrentItem() {
    let activeRow = this.activeRow;
    let activeCol = this.activeCol;
    let row = this.$(`.fancytext:nth-child(${activeRow + 1})`);
    let item = row.find(`:nth-child(${activeCol + 1})`);
    item.focus();
  }
});
