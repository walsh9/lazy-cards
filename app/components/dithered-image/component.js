import Component from '@ember/component';
import { set } from '@ember/object';
import loadImageData from '../../utils/load-image-data';
import dither from '../../utils/dither';

export default Component.extend({
  width: 0,
  height: 0,
  src: null,
  ditherMethod: null,
  finalImage: null,
  didReceiveAttrs() {
    let source = this.src;
    let width =  this.width;
    let height =  this.height;
    let ditherMethod = this.ditherMethod;
    let component = this;
    set(component, 'finalImage', null);
    loadImageData(source, width, height)
    .then(imageData => dither(imageData, ditherMethod))
    .then(ditheredImageData => {
      let canvas = document.createElement('canvas');
      let ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.putImageData(ditheredImageData, 0, 0);
      let url = canvas.toDataURL();
      set(component, 'finalImage', url);
    });
  }
});
