import { makeItemScoreByStars } from "../Util/helper.js";

export const bestMenuItemTpl = list => {
  let itemListHTML = list.reduce((ac, cv) => {
    ac += _itemTpl(cv);
    return ac;
  }, "");
  return itemListHTML;
};

const _itemTpl = item => {
  const itemHTML = `
  <li>
  <a href="">
  <div class="best_menu_item_wrap">
    <img class="best_menu_item_img" src="${item.image}" alt="">
    <div class="best_menu_item_deskbox">
      <span class="best_menu_item_sp1">${item.title}</span>
      <span class="best_menu_item_sp2">${item.description}</span>
      <div class="best_menu_item_rate">
        <span class="best_menu_item_score">
          ${makeItemScoreByStars(4)}
          <span class="best_menu_item_star">${3000}</span>
        </span>
        <span class="best_menu_item_price">${item.s_price}</span>
      </div>
    </div>
  </div>
  </a>
  </li>
    `;
  return itemHTML;
};