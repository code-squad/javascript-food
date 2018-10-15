import { navTpl } from "../templates/navTpl.js";
export default class Nav {
  constructor() { }
  renderNav(navItemList) {
    document.querySelector(".nav_list").innerHTML = navTpl(navItemList);
  }
}
