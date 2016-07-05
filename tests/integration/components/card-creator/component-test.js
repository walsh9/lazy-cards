import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card-creator', 'Integration | Component | card creator', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{card-creator}}`);
  assert.ok(this.$('h1').length, 'Header exists');
  assert.ok(this.$('.menu').length, 'Menu exists');
  assert.ok(this.$('.page').length, 'Page exists');
  assert.ok(this.$('.cardface--front').length, 'Card Face exists');
});
