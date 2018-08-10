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
  const _bestDish = function({badge, image, alt, title, description, n_price, s_price}) {
    return '<li class="best_dish">' + _badge(badge) +_bestDishImage({image, alt}) + _bestDishDescription({title, description, n_price, s_price}) + '</li>';
  }

  const _badge = function(badgeData) {
    if(!badgeData) return '';
    return badgeData.reduce((html, badgeName, idx) => html + `<div class="badge_${idx+1}">${badgeName}</div>`, '');
  }

  const _bestDishImage = function({image, alt}) {
    return `<div class="best_dish_img_wrap"><img class ='best_dish_img' src="${image}" alt="${alt}"></div>`;
  }

  const _bestDishDescription = function({title, description, n_price, s_price}) {
    return '<div class="best_dish_description">' + _bestDishName(title) + _bestDishSlogan(description) + _bestDishPrice({n_price, s_price}) +'</div>';
  }

  const _bestDishName = function(name) {
    return `<div class='best_dish_name'>${name}</div>`
  }

  const _bestDishSlogan = function(slogan) {
    return `<div class='best_dish_slogan'>${slogan}</div>`
  }

  const _bestDishPrice = function({n_price, s_price}) {
    return '<div class="best_dish_price_wrap">'+ _originPrice(n_price) + _salesPrice(s_price) + '<span class="price_unit">원</span></div>'
  }

  const _originPrice = function(price) {
    return price ? `<span class='best_dist_origin_price'>${price}</span>` : '';
  }

  const _salesPrice = function(price) {
    return `<span class='best_dist_sales_price'>${price.slice(0,-1)}</span>`
  }


  function Template() {};


  Template.prototype = {
    menuNavigation(menuData) {
      return `<ul>${menuData.reduce((html, eachMenuData) => html + _menu(eachMenuData), '')}</ul>`
    },

    bestDishesView({items, category_id}) {
      return `<ul class="best_dishes visible" data-id="${category_id}">` + 
      items.reduce((html, bestDishData) => html + _bestDish(bestDishData), '') + 
      '</ul>'
    },

    adNavigatorButton(index) {
      return `<li class='ad_navigator_button' data-index='${index}'></li>`
    },

    noticeNavigatorButton(index) {
      return `<li class='notice_navigator_button' data-index='${index}'></li>`
    }
  }
  
  return Template;
})();