export const Template = (function () {
  // menuNavigation
  const _menu = function({menuName, subMenuData}) {
    return '<li class="menu">' + _menuName(menuName) + _menuLayerUpper(menuName) + _menuLayerLower(subMenuData) + '</li>';
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

  // bestDishesView
  const _bestDish = function({image, alt, title, description, s_price}) {
    return '<li>' + _bestDishImage({image, alt}) + _bestDishDescription({title, description, s_price}) + '</li>';
  }

  const _bestDishImage = function({image, alt}) {
    return `<div class="best_dish_img_wrap"><img class ='best_dish_img' src="${image}" alt="${alt}"></div>`;
  }

  const _bestDishDescription = function({title, description, s_price}) {
    return '<div class="best_dish_description">' + _bestDishName(title) + _bestDishSlogan(description) + _bestDishPrice(s_price) +'</div>';
  }

  const _bestDishName = function(name) {
    return `<div class='best_dish_name'>${name}</div>`
  }

  const _bestDishSlogan = function(slogan) {
    return `<div class='best_dish_slogan'>${slogan}</div>`
  }

  const _bestDishPrice = function(price) {
    return `<div class='best_dish_price_wrap'><span class='best_dish_price'>${price.slice(0,-1)}</span><span class='price_unit'>원</span></div>`
  }


  function Template() {};


  Template.prototype = {
    menuNavigation(menuData) {
      return `<ul>${menuData.reduce((html, eachMenuData) => html + _menu(eachMenuData), '')}</ul>`
    },

    bestDishesView({items, category_id}) {
      return `<ul class="best_dishes" data-id="${category_id}">` + 
      items.reduce((html, bestDishData) => html + _bestDish(bestDishData), '') + 
      '</ul>'
    }
  }
  
  return Template;
})();