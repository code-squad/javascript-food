import { qs, qsa, ajax } from "../../js/Util/helper.js";

export default class BestMenu {
  constructor(apiUrl, bestMenuItemTpl) {
    this._randomIdx = () => Math.floor(Math.random() * 6);
    this.apiUrl = apiUrl;
    this.bestMenuItemTpl = bestMenuItemTpl;
  }

  init() {
    this._render(this.apiUrl, this._randomIdx());
    this._registClickTabEvt();
  }

  _render(url, idx) {
    this._removeClassIfExist('best_menu_nav_item_selected');
    ajax(url, this._renderBestMenuFromAPI.bind(this), idx);
  }

  _removeClassIfExist(targetCSSClass) {
    if (qs(`.${targetCSSClass}`)) qs(`.${targetCSSClass}`).classList.remove(targetCSSClass);
  }

  _renderBestMenuFromAPI(requestData, idx) {
    console.log(requestData);
    qs(".best_menu_item_list").innerHTML = this.bestMenuItemTpl(requestData[idx].items);
    qsa(".best_menu_nav_a")[idx].classList.add("best_menu_nav_item_selected");
  }

  _registClickTabEvt() {
    qs(".best_menu_nav").addEventListener("click", e => {
      e.preventDefault();
      this._clickTab(e.target);
    });
  }

  _clickTab(selectedDOM) {
    const number = selectedDOM.dataset.number;
    this._render(this.apiUrl, number);
  }
}