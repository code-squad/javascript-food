import { bestMenuItemTpl } from "../templates/bestMenuTpl.js";
import { qs, qsa, ajax } from "../../js/Util/helper.js";

export default class BestMenu {
  constructor() {
    this._randomIdx = () => Math.floor(Math.random() * 6);
    this.apiUrl = null;
  }

  initialize({ url }) {
    this.apiUrl = url;
    this._render(url, this._randomIdx());
    this._registClickTabEvt();
  }

  _render(url, idx) {
    this._removeClassIfExist('best_menu_nav_item_selected');
    ajax(url, this._renderBestMenuFromAPI, idx);
  }

  _removeClassIfExist(targetCSSClass) {
    if (qs(`.${targetCSSClass}`)) qs(`.${targetCSSClass}`).classList.remove(targetCSSClass);
  }

  _renderBestMenuFromAPI(requestData, idx) {
    qs(".best_menu_item_list").innerHTML = bestMenuItemTpl(requestData[idx].items);
    qsa(".best_menu_nav_a")[idx].classList.add("best_menu_nav_item_selected");
  }

  _registClickTabEvt() {
    qs(".best_menu_nav").addEventListener("click", e => {
      this._clickTab(e.target);
      e.preventDefault();
    });
  }

  _clickTab(selectedDOM) {
    const number = selectedDOM.dataset.number;
    this._render(this.apiUrl, number);
  }
}