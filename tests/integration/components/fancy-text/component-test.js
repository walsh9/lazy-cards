import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('fancy-text', 'Integration | Component | fancy text', {
  integration: true
});

test('it renders', function(assert) {
  this.set('text', '');
  this.render(hbs`{{fancy-text text=text}}`);
  assert.ok(this.$('svg').length, 'Text svg exists');
});
