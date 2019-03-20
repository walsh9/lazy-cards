import { A } from '@ember/array';
import $ from 'jquery';
import Component from '@ember/component';
import { computed } from '@ember/object';
import emojione from 'emojione';
import { get } from '@ember/object';
import { set } from '@ember/object';

export default Component.extend({
  classNames: ['emoji-selector'],
  emojis: null,
  category: null,
  choosingGraphics: false,
  init() {
    this._super(...arguments);
    this.categoryList = this.categoryList || [
      'people',
      'nature',
      'food',
      'activity',
      'travel',
      'objects',
      'symbols',
      // 'new!',
    ];
    // not in this timeline
    this.temporalBlackList = this.temporalBlackList || [
      ':iphone:',
      ':calling:',
      ':desktop:',
      ':euro:',
      ':mobile_phone_off:',
      ':vibration_mode:',
      ':no_mobile_phones:',
      ':selfie_tone1:',
      ':selfie_tone2:',
      ':selfie_tone3:',
      ':selfie_tone4:',
      ':selfie_tone5:',
    ];
  },
  emojiList: computed('emojis', 'category', function() {
    let alias = {'new!': 'unicode9'};
    let emojis = get(this, 'emojis');
    if (emojis) {
      let category = get(this, 'category');
      category = alias[category] || category;
      return emojis.filterBy('category', category).filter( emoji => !get(this, 'temporalBlackList').includes(emoji.shortname) );
    }
    return [];
  }),
  didReceiveAttrs() {
    let component = this;
    $.getJSON('emoji.json').then((data) => {
      let emojiList = Object.keys(data).map(key => {
        return Object.assign({}, data[key], {
          id: key,
          character: emojione.shortnameToUnicode(key),
        });
      }).sort((a,b) => Number(a.emoji_order) - Number(b.emoji_order));
      set(component, 'emojis', A(emojiList));
    });
  },
  actions: {
    setCategory(category) {
      set(this, 'category', category);
      set(this, 'choosingGraphics', true);
    },
    setGraphic(emoji) {
      set(this, 'choosingGraphics', false);
      this.sendAction('selectEmoji', emoji);
    },
    cancel() {
      set(this, 'choosingGraphics', false);
    }
  }
});
