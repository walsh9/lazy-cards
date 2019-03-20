import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | card creator', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{card-creator}}`);
    assert.ok(findAll('h1').length, 'Header exists');
    assert.ok(findAll('.mainmenu').length, 'Menu exists');
    assert.ok(findAll('.page').length, 'Page exists');
    assert.ok(findAll('.cardface--front').length, 'Card Face exists');
  });
});
