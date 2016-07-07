import Ember from 'ember';
import Component from 'ember-component';
import computed from 'ember-computed';
import emojione from 'npm:emojione';
import get from 'ember-metal/get';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['emojiselector'],
  emojis: null,
  category: 'people',
  categories: [
    'people',
    'nature',
    'food',
    'activity',
    'travel',
    'objects',
    'symbols',
    'new!',
    ],
  emojiList: computed('emojis', 'category', function() {
    let alias = {'new!': 'unicode9'}
    let emojis = get(this, 'emojis');
    if (emojis) {
      let category = get(this, 'category');
      category = alias[category] || category;
      return emojis.filterBy('category', category);
    }
    return [];
  }),
  didReceiveAttrs() {
    let component = this;
    Ember.$.getJSON('emoji.json').then((data) => {
      let emojiList = Object.keys(data).map(key => {
        return Object.assign({}, data[key], {
          id: key,
          character: emojione.shortnameToUnicode(key),
        });
      }).sort((a,b) => Number(a.emoji_order) - Number(b.emoji_order));
      set(component, 'emojis', Ember.A(emojiList));
    });
  },
  actions: {
    setCategory(category) {
      set(this, 'category', category);
    }
  }
});
