export const Template = (function () {
  const _menu = function({menuName, subMenuData}) {
    return `<li class='menu'>${_menuName(menuName)}${_menuLayerUpper(menuName)}${_menuLayerLower(subMenuData)}</li>`
  }

  const _menuName = function(menuName) {
    return `<span>${menuName}</span>`
  }

  const _menuLayerUpper = function(menuName){
    return `
    <div class='menu_layer_upper'>
      <span>${menuName}</span>
    </div>`
  }

  const _menuLayerLower = function(subMenuData){
    let subMenuListItems = '';

    subMenuData.forEach(subMenu => {
      subMenuListItems += `<li class='sub_menu'>${subMenu}</li>`
    })

    return `<ul class='menu_layer_lower'>${subMenuListItems}</ul>`;
  }

  function Template() {};

  Template.prototype = {
    menuNavigation(menuData) {
      return `<ul>${menuData.reduce((html, eachMenuData) => html + _menu(eachMenuData), '')}</ul>`
    }
  }
  
  return Template;
})();