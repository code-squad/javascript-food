import { $on, qs, qsa, pipe } from '../Util/helper.js'

export default class Header {
  constructor(navItemList, navTpl) {
    this.navItemList = navItemList;
    this.navTpl = navTpl;
  }

  init() {
    this._render(this.navItemList);
  }

  _render(navItemList) {
    qs(".nav_list").innerHTML = this.navTpl(navItemList);
  }

}
