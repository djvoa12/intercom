import Ember from 'ember';

const { Helper } = Ember;
const { helper } = Helper;

export function dateFormat(argsArray) {
  let month = argsArray[0];
  let day = argsArray[1];
  let year = argsArray[2];

  return `${month}/${day}/${year}`;
}

export default helper(dateFormat);
