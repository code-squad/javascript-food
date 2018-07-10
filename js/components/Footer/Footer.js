import { qs } from '../../helper/helper';

export default class Footer {
  constructor(selector) {
    this.footer = qs(selector);
  }

  render(template, footerItems) {
    this.footer.innerHTML = template(footerItems);
  }
}
