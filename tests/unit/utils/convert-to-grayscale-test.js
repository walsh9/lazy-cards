/* globals Uint8ClampedArray, ImageData */
import convertToGrayscale from 'lazy-cards/utils/convert-to-grayscale';
import { module, test } from 'qunit';

module('Unit | Utility | convert to grayscale');

test('it converts a simple checkerboard to a grayscale array', function(assert) {
  let sampleImageDataSource = [
      0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255,   0,
    255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255,
      0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255,   0,
    255, 255, 255, 255,   0,   0,   0, 255, 255, 255, 255, 255,   0,   0,   0, 255
    ];
  let sampleImageDataArray = Uint8ClampedArray.from(sampleImageDataSource);
  let sampleImageData = new ImageData(sampleImageDataArray, 4, 4);
  let actual = convertToGrayscale(sampleImageData);
  const expected = Uint8ClampedArray.from([0, 255, 0, 255, 255, 0, 255, 0, 0, 255, 0, 255, 255, 0, 255, 0]);
  assert.deepEqual(actual, expected);
});
