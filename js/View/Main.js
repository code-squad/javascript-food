import { menuTpl } from "../templates/menu.js";
export default class Main {
  constructor() {}
  renderMenu(menuList) {
    document.querySelector(".menu_item_list").innerHTML = menuTpl(menuList);
  }
}
