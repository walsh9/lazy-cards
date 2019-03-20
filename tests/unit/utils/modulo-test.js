import modulo from 'lazy-cards/utils/modulo';
import { module, test } from 'qunit';

module('Unit | Utility | modulo', function() {
  test('it works', function(assert) {
    assert.equal(modulo(1, 10), 1);
    assert.equal(modulo(10, 10), 0);
    assert.equal(modulo(15, 10), 5);
    assert.equal(modulo(20, 10), 0);
    assert.equal(modulo(-4, 10), 6);
    assert.equal(modulo(-12, 10), 8);
    assert.equal(modulo(6, 1), 0);
    assert.equal(modulo(-8, 1), 0);
    assert.ok(Number.isNaN(modulo(-2, 0)));
    assert.ok(Number.isNaN(modulo(5, 0)));
  });
});
