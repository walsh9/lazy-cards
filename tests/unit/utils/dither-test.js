/* globals Uint8ClampedArray, ImageData */
import dither from 'lazy-cards/utils/dither';
import { module, test } from 'qunit';

module('Unit | Utility | dither');

// Replace this with your real tests.
test('it returns unchanged imagedata for a simple checkerboard', function(assert) {
  let sampleImageDataSource = [
      0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255,   0,
    255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255,
      0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255,   0,
    255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255
    ];
  let sampleImageDataArray = Uint8ClampedArray.from(sampleImageDataSource);
  let sampleImageData = new ImageData(sampleImageDataArray, 4, 4);
  let actual = dither(sampleImageData, 'FloydSteinberg');
  const expected = new ImageData(sampleImageDataArray, 4, 4);
  assert.deepEqual(actual, expected);
});
