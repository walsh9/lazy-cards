import Component from '@ember/component';
import $ from 'jquery';
import { get, getProperties } from '@ember/object';
import { set } from '@ember/object';
import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { EKMixin, EKOnInsertMixin, keyDown } from 'ember-keyboard';
import modulo from '../../utils/modulo';
import scrollParent from 'npm:scrollparent';

export default Component.extend(EKMixin, EKOnInsertMixin, {
  tagName: 'ul',
  attributeBindings: ['role'],
  role: 'menu',
  classNames: ['keyboardmenu'],
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
      if (index !== get(this, 'currentIndex')) {
        set(this, 'currentIndex', index);
      }
      let currentItem = get(this, 'currentItem');
      this.sendAction('selectHandler', currentItem);
    },
    cancel: function() {
      this.sendAction('cancelHandler');
    }
  },
  currentIndex: 0,
  itemSelector: 'li',
  didReceiveAttrs() {
    scheduleOnce('afterRender', this, function() {
      let itemSelector = get(this, 'itemSelector');
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
    let {currentIndex, options} = getProperties(this, 'currentIndex', 'options');
    return options[currentIndex];
  }),
  currentElement: computed('currentPos', 'elementGrid', function() {
    let {currentPos, elementGrid} = getProperties(this, 'currentPos', 'elementGrid');
    let {x, y} = currentPos;
    return elementGrid.grid[x][y].itemEl;
  }),
  currentPos: computed('currentIndex', 'elementGrid', {
    get() {
      let {currentIndex, elementGrid} = getProperties(this, 'currentIndex', 'elementGrid');
      return this._indexToPos(currentIndex, elementGrid);
    },
    set(pos) {
      let grid = get(this, 'elementGrid');
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
    let {currentIndex, options} = getProperties(this, 'currentIndex', 'options');
    return modulo((currentIndex + 1), options.length);
  }),
  prev: computed('currentIndex', 'elementGrid', function() {
    let {currentIndex, options} = getProperties(this, 'currentIndex', 'options');
    return modulo((currentIndex - 1), options.length);
  }),
  chooseCurrent: on(keyDown('Enter'), keyDown('Space'), function(event) {
    event.preventDefault();
    let currentIndex = get(this, 'currentIndex');
    this.send('select', this._getItem(currentIndex).index);
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
    set(this, 'currentIndex', this._getItem(get(this, targetName)).index);
    this._scrollIntoView(get(this, 'currentElement'));
  },
  _getItem(index) {
    let options = get(this, 'options');
    let item = options[index];
    return {item, index};
  },
  _getRelativePos(deltaPos) {
    // delta.x and delta.y should only be -1, 0, or 1

    let {currentPos, elementGrid} = getProperties(this, 'currentPos', 'elementGrid');
    let x = modulo((currentPos.x + deltaPos.x), elementGrid.width);
    let y = modulo((currentPos.y + deltaPos.y), elementGrid.height);
    while (!elementGrid.grid[x][y]) {
      x = modulo((x + deltaPos.x), elementGrid.width);
      y = modulo((y + deltaPos.y), elementGrid.height);
    }
    return {x, y};
  },
  _getRelativeIndex(deltaPos) {
    return this._posToIndex(this._getRelativePos(deltaPos));
  },
  _indexToPos(index) {
    let grid = get(this, 'elementGrid');
    let width = grid.width;
    let x = modulo(index, width);
    let y = Math.floor(index / width);
    return {x, y};
  },
  _posToIndex(pos) {
    let grid = get(this, 'elementGrid');
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
