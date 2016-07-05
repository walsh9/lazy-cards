let _lightness = (r,g,b) => {
  let luminance = 0.2126 * r/255 + 0.7152 * g/255 + 0.0722 * b/255;
  return 116 * Math.pow(luminance, 1/3) - 16;
};

export default function convertToGrayscale(imageData) {
  let grayscale = new Uint8ClampedArray(imageData.width * imageData.height);
  for (let i = 0; i < imageData.data.length; i +=4) {
    let [r, g, b] = imageData.data.slice(i, i+3);
    let l = Math.floor(_lightness(r,g,b)/100 * 255);
    grayscale[i/4] = l;
  }
  return grayscale;
}
