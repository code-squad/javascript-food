import { qs } from '../../../helper/helper';

export default class ListItems {
  constructor(selector, linkList, template) {
    this.linkListEl = qs(selector);
    this.linkList = linkList;
    this.template = template;
  }

  render() {
    const { linkList } = this;
    this.linkListEl.innerHTML = this.template(linkList);
  }
}
