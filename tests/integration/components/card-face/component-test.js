import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Page from 'cards/lib/page';

moduleForComponent('card-face', 'Integration | Component | card face', {
  integration: true
});

test('it renders', function(assert) {
  this.set('data', Page.create());
  this.render(hbs`{{card-face data=data}}`);
  assert.ok(this.$('.graphic').length, 'Graphics exist');
  assert.ok(this.$('.text').length, 'Text exists');
});
