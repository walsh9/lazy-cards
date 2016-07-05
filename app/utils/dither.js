import convertToGrayscale from './convert-to-grayscale';

const ditherMethods = {
  'floyd-steinberg': [
    {x:  1, y:  0, value: 7/16},
    {x: -1, y:  1, value: 3/16},
    {x:  0, y:  1, value: 5/16},
    {x:  1, y:  1, value: 1/16},
  ],
  'atkinson': [
    {x:  1, y:  0, value: 1/8},
    {x:  2, y:  0, value: 1/8},
    {x: -1, y:  1, value: 1/8},
    {x:  0, y:  1, value: 1/8},
    {x:  1, y:  1, value: 1/8},
    {x:  0, y:  2, value: 1/8},
  ],
  'sierra': [
    {x:  1, y:  0, value: 5/32},
    {x:  2, y:  0, value: 3/32},
    {x: -2, y:  1, value: 2/32},
    {x: -1, y:  1, value: 4/32},
    {x:  0, y:  1, value: 5/32},
    {x:  1, y:  1, value: 4/32},
    {x:  2, y:  1, value: 2/32},
    {x: -1, y:  2, value: 2/32},
    {x:  0, y:  2, value: 3/32},
    {x:  1, y:  2, value: 2/32},
  ],
};

export default function dither(imageData, method) {
  let ditherMethod = ditherMethods[method] || [];
  let grayscaleImage = convertToGrayscale(imageData);
  let width = imageData.width;
  let height = imageData.height;
  let data = imageData.data;
  grayscaleImage.forEach((pixel, i) => {
    let oldPixel   = pixel;
    let newPixel   = pixel > 128 ? 255 : 0;
    let quantError = oldPixel - newPixel;
    data[i*4] = data[i*4+1] = data[i*4+2] = newPixel;
    let x = i % width;
    let y = Math.floor(i / width);
    ditherMethod.forEach(dith => {
      let dx = x + dith.x;
      let dy = y + dith.y;
      if (dx < width && dx >= 0 && dy < height) {
        grayscaleImage[dx + dy * width] += Math.round(quantError * dith.value);
      }
    });
  });
  return imageData;
}
