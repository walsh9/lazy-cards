import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('emoji-page', 'Integration | Component | emoji page', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{emoji-page}}`);
  assert.ok(this.$('.emojiselector-list').length, 'List exists');
});
