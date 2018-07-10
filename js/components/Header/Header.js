import { qs } from '../../helper/helper';

export default class Header {
  constructor(selector) {
    this.header = qs(selector);
  }

  render(template, headerItems) {
    this.header.innerHTML = template(headerItems);
  }
}
