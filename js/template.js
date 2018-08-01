export class Template {
  menuLayer({name, subMenuData}) {
    return this._menuLayerUpper(name) + this._menuLayerLower(subMenuData);
  }

  menu(name) {
    return `<span>${name}</span>`;
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