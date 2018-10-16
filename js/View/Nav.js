import { navTpl } from "../templates/navTpl.js";
export default class Nav {
  constructor() { }
  initialize(navItemList) {
    this._render(navItemList)
  }
  _render(navItemList) {
    document.querySelector(".nav_list").innerHTML = navTpl(navItemList);
  }
}
