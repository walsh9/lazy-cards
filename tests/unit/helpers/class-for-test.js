import { classFor } from 'lazy-cards/helpers/class-for';
import { module, test } from 'qunit';

module('Unit | Helper | class for');

// Replace this with your real tests.
test('it creates a class name', function(assert) {
  let actual = classFor(['border', 'Stars And Stripes']);
  const expected = 'border--stars-and-stripes';
  assert.equal(actual, expected);
});
