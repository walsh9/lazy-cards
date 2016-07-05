import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('border-selector', 'Integration | Component | border selector', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{border-selector}}`);
  assert.equal(this.$().text().trim(), 'Choose a Border');
});
