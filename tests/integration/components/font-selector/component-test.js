import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('font-selector', 'Integration | Component | font selector', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{font-selector}}`);
  assert.equal(this.$().text().trim(), 'Choose a Font');
});
