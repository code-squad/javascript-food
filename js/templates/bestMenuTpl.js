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
  <div class="menu_item_wrap">
    <img class="menu_item_img" src="${item.image}" alt="">
    <div class="menu_item_deskbox">
      <span class="menu_item_sp1">${item.title}</span>
      <span class="menu_item_sp2">${item.description}</span>
      <div class="menu_item_rate">
        <span class="menu_item_score">
          ${_makeItemScoreByStars(4)}
          <span class="menu_item_star">${3000}</span>
        </span>
        <span class="menu_item_price">${item.s_price}</span>
      </div>
    </div>
  </div>
  </a>
  </li>
    `;
  return itemHTML;
};

function _makeItemScoreByStars(star) {
  let result = "";
  let MAX_COUNT = 5;
  for (let i = MAX_COUNT; i > 0; i-- , star--) {
    result += star > 0 ? "<span>★</span>" : "<span>☆</span>";
  }
  return result;
}