import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | fancy text', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('text', '');
    await render(hbs`{{fancy-text text=text}}`);
    assert.ok(findAll('svg').length, 'Text svg exists');
  });
});
