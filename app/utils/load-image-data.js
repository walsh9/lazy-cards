import RSVP from 'rsvp';

export default function loadImageData(source, width, height) {
  return new RSVP.Promise((resolve) => {
    let image = document.createElement('img');
    image.onload = event => {
      let image = event.target;
      let canvas = document.createElement('canvas');
      if (!width) {
        width = image.width;
      }
      if (!height) {
        height = image.height;
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      let imageData = ctx.getImageData(0, 0, width, height);
      resolve(imageData);
    };
    image.src = source;
  });
}
