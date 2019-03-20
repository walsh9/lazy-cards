import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, findAll } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Page from 'lazy-cards/lib/page';

module('Integration | Component | card face', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    this.set('data', Page.create());
    await render(hbs`{{card-face data=data}}`);
    assert.ok(findAll('.graphic').length, 'Graphics exist');
    assert.ok(findAll('.text').length, 'Text exists');
  });
});
