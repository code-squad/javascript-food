import { bestMenuItemTpl } from "../templates/bestMenuTpl.js";
import { qs } from "../../js/Util/helper.js";
export default class BestMenu {
  constructor() {
    this.clickTab = null;
    this._randomIdx = () => Math.floor(Math.random() * 6);
  }
  initialize() {
    this.registClickTabEvt();
  }
  render({ url }) {
    this.renderBestMenu(url, this._randomIdx());
  }

  renderBestMenu(url, idx) {
    this.ajax(url, callback, idx);

    function callback(requestData, idx) {
      if (!!qs(".menu_nav_item_selected"))
        qs(".menu_nav_item_selected").classList.remove("menu_nav_item_selected");

      qs(".menu_item_list").innerHTML = bestMenuItemTpl(requestData[idx].items);
      qs(".best_menu_nav").children[idx].children[0].classList.add("menu_nav_item_selected");
    }
  }

  registClickTabEvt() {
    qs(".best_menu_nav").addEventListener("click", e => {
      this.clickTab(e.target);
      e.preventDefault();
    });
  }

  ajax(url, handler, idx) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      const requestData = JSON.parse(xhr.response);
      handler(requestData, idx);
    });
    xhr.open("GET", url);
    xhr.send();
  }
}
