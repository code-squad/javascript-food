import { navTpl } from "../templates/navTpl.js";
export default class Nav {
  constructor(navItemList) {
    this.navItemList = navItemList;
  }
  init() {
    this._render(this.navItemList)
  }
  _render(navItemList) {
    document.querySelector(".nav_list").innerHTML = navTpl(navItemList);
  }
}
