import { helper } from 'ember-helper';
import { htmlSafe } from 'ember-string';

export function classFor([prop, type]) {
  if (prop && type) {
    return htmlSafe(prop.dasherize() + '--' + type.dasherize());
  }
  return htmlSafe('');
}

export default helper(classFor);
