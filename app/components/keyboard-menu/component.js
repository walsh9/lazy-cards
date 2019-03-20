import Component from '@ember/component';
import $ from 'jquery';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import modulo from '../../utils/modulo';
import scrollParent from 'scrollparent';

export default Component.extend(EKMixin, EKOnInsertMixin, {
  tagName: 'ul',
  attributeBindings: ['role'],
  role: 'menu',
  classNames: ['keyboardmenu'],
  selectAction: () => {},
  cancelAction: () => {},
  init() {
    this._super(...arguments);
    this.options = this.options || [];
    this.elementGrid = this.elementGrid || {
      grid: [],
      width: 0,
      height: 0,
    };
  },
  actions: {
    select: function(index) {
      if (index !== this.currentIndex) {
        set(this, 'currentIndex', index);
      }
      let currentItem = this.currentItem;
      this.selectAction(currentItem);
    },
    cancel: function() {
      this.cancelAction('cancelHandler');
    }
  },
  currentIndex: 0,
  itemSelector: 'li',
  didReceiveAttrs() {
    scheduleOnce('afterRender', this, function() {
      let itemSelector = this.itemSelector;
      let elements = this.$(itemSelector).toArray();
      let lefts = elements.map(itemEl => $(itemEl).offset().left).uniq();
      let tops = elements.map(itemEl => $(itemEl).offset().top).uniq();
      let grid = [];
      lefts.forEach(() => grid.push([]));
      elements.forEach((itemEl, index) => {
        let x = lefts.indexOf( $(itemEl).offset().left );
        let y = tops.indexOf( $(itemEl).offset().top );
        grid[x][y] = {itemEl, index};
      });
      let width = lefts.length;
      let height = tops.length;
      set(this, 'elementGrid', {grid, width, height});
    });
  },
  currentItem: computed('currentIndex', 'options', function() {
    return this.options[this.currentIndex];
  }),
  currentElement: computed('currentPos', 'elementGrid', function() {
    let {x, y} = this.currentPos;
    return this.elementGrid.grid[x][y].itemEl;
  }),
  currentPos: computed('currentIndex', 'elementGrid', {
    get() {
      return this._indexToPos(this.currentIndex, this.elementGrid);
    },
    set(pos) {
      let grid = this.elementGrid;
      set(this, 'currentIndex', this._posToIndex(pos, grid));
      return pos;
    }
  }),
  left: computed('currentIndex', 'elementGrid', function() {
    return this._getRelativeIndex({x: -1, y: 0});
  }),
  right: computed('currentIndex', 'elementGrid', function() {
    return this._getRelativeIndex({x: 1, y: 0});
  }),
  up: computed('currentIndex', 'elementGrid', function() {
    return this._getRelativeIndex({x: 0, y: -1});
  }),
  down: computed('currentIndex', 'elementGrid', function() {
    return this._getRelativeIndex({x: 0, y: 1});
  }),
  next: computed('currentIndex', 'elementGrid', function() {
    return modulo((this.currentIndex + 1), this.options.length);
  }),
  prev: computed('currentIndex', 'elementGrid', function() {
    return modulo((this.currentIndex - 1), this.options.length);
  }),
  chooseCurrent: on(keyDown('Enter'), keyDown('Space'), function(event) {
    event.preventDefault();
    this.send('select', this._getItem(this.currentIndex).index);
  }),
  selectLeft: on(keyDown('ArrowLeft'), function(event) {
    this._moveViaKeyboard('left', event);
  }),
  selectRight: on(keyDown('ArrowRight'), function(event) {
    this._moveViaKeyboard('right', event);
  }),
  selectUp: on(keyDown('ArrowUp'), function(event) {
    this._moveViaKeyboard('up', event);
  }),
  selectDown: on(keyDown('ArrowDown'), function(event) {
    this._moveViaKeyboard('down', event);
  }),
  selectNext: on(keyDown('Tab'), function(event) {
    this._moveViaKeyboard('next', event);
  }),
  selectPrev: on(keyDown('Tab+shift'), function(event) {
    this._moveViaKeyboard('prev', event);
  }),
  abort: on(keyDown('Escape'), function(event) {
    event.preventDefault();
    this.send('cancel');
  }),
  _moveViaKeyboard(targetName, event) {
    event.preventDefault();
    set(this, 'currentIndex', this._getItem(this[targetName]).index);
    this._scrollIntoView(this.currentElement);
  },
  _getItem(index) {
    let options = this.options;
    let item = options[index];
    return {item, index};
  },
  _getRelativePos(deltaPos) {
    // delta.x and delta.y should only be -1, 0, or 1

    let x = modulo((this.currentPos.x + deltaPos.x), this.elementGrid.width);
    let y = modulo((this.currentPos.y + deltaPos.y), this.elementGrid.height);
    while (!this.elementGrid.grid[x][y]) {
      x = modulo((x + deltaPos.x), this.elementGrid.width);
      y = modulo((y + deltaPos.y), this.elementGrid.height);
    }
    return {x, y};
  },
  _getRelativeIndex(deltaPos) {
    return this._posToIndex(this._getRelativePos(deltaPos));
  },
  _indexToPos(index) {
    let grid = this.elementGrid;
    let width = grid.width;
    let x = modulo(index, width);
    let y = Math.floor(index / width);
    return {x, y};
  },
  _posToIndex(pos) {
    let grid = this.elementGrid;
    return pos.x + pos.y * grid.width;
  },
  _scrollIntoView(element) {
    let parent = scrollParent(element);
    let parentOffsetBottom = parent.offsetTop + parent.clientHeight;
    let elementOffsetBottom = element.offsetTop + element.clientHeight;
    let relTop = element.offsetTop - parent.offsetTop;
    let relBottom = (element.offsetTop + element.clientHeight) - parent.offsetTop;
    let newPos;
      if (relTop < parent.scrollTop) {
        newPos = element.offsetTop - parent.offsetTop;
      } else if (relBottom > (parent.scrollTop + parent.clientHeight)) {
        newPos = elementOffsetBottom - parentOffsetBottom;
      }
      if (newPos !== undefined && parent.scrollTop !== newPos) {
        this._scroll(parent, newPos);
      }
  },
  _scroll(parent, newTop) {
    parent.scrollTop = newTop;
  }
});
