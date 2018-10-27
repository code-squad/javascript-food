import { makeItemScoreByStars } from "../Util/helper.js";



export const makeSliderTpl = (list) => {
  let slideWrapHTML = '';
  const ROW_SIZE = 4;
  list.reduce((temp, cv, idx) => {
    temp.acc += sideMenuItemTpl(cv);
    if ((idx + 1) % ROW_SIZE === 0 || idx === list.length) {
      slideWrapHTML +=
        `
        <ul class="side_item_wrap" data-num="${temp.ulCount}">
        ${temp.acc}
        </ul>`
      temp.acc = '';
      temp.ulCount++;
    }
    return temp;
  }, { acc: '', ulCount: 0 });
  return slideWrapHTML;
}
function sideMenuItemTpl(data) {
  const sideMenuItemHTML =
    `<li>
    <a href="" class="side_menu_a">
      <div class="side_menu_box">
        <img class="side_menu_img" src="${data.image}">
        <span class="best_menu_item_sp1 side_menu_sp1">${data.title}</span>
        <span class="best_menu_item_sp2 side_menu_sp2">${data.description}</span>
        <div class="best_menu_item_rate">
          <span class="best_menu_item_score">
            ${makeItemScoreByStars(4)}
            <span class="best_menu_item_star">${3000}</span>
          </span>
          <span class="best_menu_item_price">${data.s_price}</span>
          ${sideMenuBadgeTpl.best('베스트')}
          </div>
          </div>
    </a>
  </li>
  `
  return sideMenuItemHTML;
}

const sideMenuBadgeTpl = {
  normal: (name) => `<div class="side_menu_badge"><span class="side_menu_badge_sp">${name}</span></div>`,
  best: (name) => `<div class="side_menu_badge badge_best_color"><span class="side_menu_badge_sp">${name}</span></div>`
}