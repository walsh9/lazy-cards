import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('dithered-image', 'Integration | Component | dithered image', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{dithered-image}}`);
  assert.equal(this.$().text().trim(), '');
});
