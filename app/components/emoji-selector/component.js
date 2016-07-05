import Component from 'ember-component';
import computed from 'ember-computed';
import emojione from 'npm:emojione';

export default Component.extend({
  classNames: ['emojiselector'],
  emojioneList: emojione.emojioneList,
  emojiList: computed('emojioneList', () => {
    let emojioneList = emojione.emojioneList;
    if (emojioneList) {
      return Object.keys(emojioneList)
      .filter(key => emojioneList[key].isCanonical)
      .map(key =>
        {
          return {
            shortname: key,
            unicode: emojioneList[key].unicode.slice(-1)[0],
            character: emojione.shortnameToUnicode(key)
          };
        }
      );
    }
    return [];
  }),
  actions: {
    click(emoji) {
      this.sendAction('selectEmoji', emoji);
    }
  }
});
