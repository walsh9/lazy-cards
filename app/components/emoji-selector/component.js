import { A } from '@ember/array';
import $ from 'jquery';
import Component from '@glimmer/component';
import { action, computed } from '@ember/object';
import emojione from 'emojione';
import { set } from '@ember/object';

export default class emojiSelector extends Component {
  emojis = null;
  category = null;
  choosingGraphics = false;

  constructor() {
    super(...arguments);
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

  }

  @computed('emojis', 'category')
  get emojiList() {
    let alias = {'new!': 'unicode9'};
    if (this.emojis) {
      let category = this.category;
      category = alias[category] || category;
      return this.emojis.filterBy('category', category).filter( emoji => !this.temporalBlackList.includes(emoji.shortname) );
    }
    return [];
  }

  @action
  setCategory(category) {
    set(this, 'category', category);
    set(this, 'choosingGraphics', true);
  }

  @action
  setGraphic(emoji) {
    set(this, 'choosingGraphics', false);
    this.args.emojiSelectAction(emoji);
  }

  @action
  cancelGraphicSelect() {
    set(this, 'choosingGraphics', false);
  }
}
