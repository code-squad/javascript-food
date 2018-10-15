import { bestMenuItemTpl } from "../templates/bestMenu.js";
import { qs } from "../../js/Util/helper.js";
export default class BestMenu {
  constructor() {
    this.clickTab = null;
    this._randomIdx = function() {
      return Math.floor(Math.random() * 6);
    };
  }
  initialize() {
    this.registClickTabEvt();
  }
  render({ url, ajax }) {
    ajax(url, this.renderBestMenu, this._randomIdx());
  }

  renderBestMenu(requestData, idx) {
    qs(".menu_item_list").innerHTML = bestMenuItemTpl(requestData[idx].items);

    if (!!qs(".menu_nav_item_selected")) {
      qs(".menu_nav_item_selected").classList.remove("menu_nav_item_selected");
    }
    qs(".best_menu_nav").children[idx].classList.add("menu_nav_item_selected");
  }

  registClickTabEvt() {
    qs(".best_menu_nav").addEventListener("click", ({ target }) => {
      this.clickTab(target);
    });
  }
}
