import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('emoji-selector', 'Integration | Component | emoji selector', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{emoji-selector}}`);
  assert.equal(this.$('h1').text().trim(), 'Choose a Category');
});
