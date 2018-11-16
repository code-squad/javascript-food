import { makeItemScoreByStars } from "../Util/helper.js";

export const slideTpl = {
  makeSliderTpl: function (id, title, subtitle) {
    return `
        <div class="slide_arrow">
          <a href=""><img class="slide_left_nav" src="./css/images/side/arrow_grey_left.png" alt=""></a>
          <a href=""><img class="slide_right_nav" src="./css/images/side/arrow_grey_right.png" alt=""></a>
        </div>
        <div class="wrap slide_wrap">
          <h4 class="slide_head1">${title}</h4>
          <span class="slide_head2">${subtitle}</strong></span>
          <div class="slide_wrap">
            <div id="${id}_slider" class="slider">
              <!-- slide_menu_ul -->
            </div>
          </div>
        </div>
        <a href="" class="slide_menu_btn">
          <span class="slide_menu_btn_sp">${title} 전체보기</span>
        </a>
  `
  },
  makeSlideItemTpl: function (list, ROW_SIZE = 4) {
    const slideWrapHTML = list.reduce((acc, cv, idx) => {
      acc.temp += _sideMenuItemTpl(cv);
      if ((idx + 1) % ROW_SIZE === 0 || idx === list.length) {
        acc.unit.push(ulWrapping('slide_item_wrap', acc.temp));
        acc.temp = '';
      }
      return acc;
    }, { unit: [], temp: '' });
    const slideArr = _addFakeSlide(slideWrapHTML.unit);
    return slideArr;
  }
}
function ulWrapping(className, liData) {
  return `<ul class="${className}">${liData}</ul>`
}
function _addFakeSlide(slideArr) {
  slideArr.push(slideArr[0]);
  slideArr.unshift(slideArr[slideArr.length - 2]);
  return slideArr;
}
function _sideMenuItemTpl(data) {
  const sideMenuItemHTML =
    `<li>
      <a href="" class="slide_menu_a">
      <div class="slide_menu_box">
      <div class="slide_menu_img_wrap"><img class="slide_menu_img" src="${data.image}">
        <div class="slide_menu_deli1">${data.delivery_type[0]}</div>
        <hr class="slide_menu_deli_hr">
        <div class="slide_menu_deli2">${data.delivery_type[1]}</div>
        <div class="after"></div>
      </div>
      <span class="best_menu_item_sp1 slide_menu_sp1">${data.title}</span>
      <span class="best_menu_item_sp2 slide_menu_sp2">${data.description}</span>
      <div class="best_menu_item_rate">
        <span class="best_menu_item_score">${makeItemScoreByStars(4)}
          <span class="best_menu_item_star">${3000}</span>
        </span>
        <span class="best_menu_item_price">${data.s_price}</span>
        ${sideMenuBadgeTpl.best('베스트')}
      </div>
    </a>
  </li>
  `
  return sideMenuItemHTML;
}

const sideMenuBadgeTpl = {
  normal: (name) => `<div class="slide_menu_badge"><span class="slide_menu_badge_sp">${name}</span></div>`,
  best: (name) => `<div class="slide_menu_badge badge_best_color"><span class="slide_menu_badge_sp">${name}</span></div>`
}