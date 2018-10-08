import { navTpl } from "../templates/nav.js";
export default class Nav {
  constructor() {}
  renderNav(navItemList) {
    document.querySelector(".nav_list").innerHTML = navTpl(navItemList);
  }
}
