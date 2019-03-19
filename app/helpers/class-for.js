import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function classFor([prop, type]) {
  if (prop && type) {
    if (prop === '') {
      return type.dasherize();
    } else {
      return htmlSafe(prop.dasherize() + '--' + type.dasherize());
    }
  }
  return htmlSafe('');
}

export default helper(classFor);
