import {Model} from "./model.js";
import {Controller} from "./controller.js";
import {MenuNavigation} from "./menuNavigation.js";

class Template {
  menuLayer({name, subMenuData}) {
    return this._menuLayerUpper(name) + this._menuLayerLower(subMenuData);
  }

  _menuLayerUpper(name) {
    return `<div class='menu_layer_upper'>${name}</div>`
  }

  _menuLayerLower(subMenuData) {
    let subMenuListItems = '';

    subMenuData.forEach(subMenu => {
      subMenuListItems += `<li class='sub_menu'>${subMenu}</li>`
    })

    return `<ul class='menu_layer_lower'>${subMenuListItems}</ul>`;
  }
}

let template = new Template();

let model = new Model();

let menuNavigation = new MenuNavigation({
  menuNavigation: document.querySelector('nav'),
  template: template
})

let controller = new Controller({
  model: model,
  view: menuNavigation
})