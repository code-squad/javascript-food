import { makeItemScoreByStars } from "../Util/helper.js";



export const makeSliderTpl = (list) => {
  const ROW_SIZE = 4;
  const slideWrapHTML = list.reduce((acc, cv, idx) => {
    acc.temp += sideMenuItemTpl(cv);
    if ((idx + 1) % ROW_SIZE === 0 || idx === list.length) {
      acc.unit +=
        `
        <ul class="side_item_wrap" data-num="${acc.ulCount}">
        ${acc.temp}
        </ul>`
      acc.temp = '';
      acc.ulCount++;
    }
    return acc;
  }, { unit: '', temp: '', ulCount: 0 });
  return slideWrapHTML.unit;
}
function sideMenuItemTpl(data) {
  const sideMenuItemHTML =
    `<li>
      <a href="" class="side_menu_a">
      <div class="side_menu_box">
      <div class="img_container"><img class="side_menu_img" src="${data.image}">
        <div class="side_menu_deli1">${data.delivery_type[0]}</div>
        <hr class="side_menu_deli_hr">
        <div class="side_menu_deli2">${data.delivery_type[1]}</div>
        <div class="after"></div>
      </div>
      <span class="best_menu_item_sp1 side_menu_sp1">${data.title}</span>
      <span class="best_menu_item_sp2 side_menu_sp2">${data.description}</span>
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
function makeDarkBackground(imgSource) {
  return `linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgSource})`
}

const sideMenuBadgeTpl = {
  normal: (name) => `<div class="side_menu_badge"><span class="side_menu_badge_sp">${name}</span></div>`,
  best: (name) => `<div class="side_menu_badge badge_best_color"><span class="side_menu_badge_sp">${name}</span></div>`
}