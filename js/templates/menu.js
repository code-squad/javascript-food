export const menuTpl = list => {
  let itemListHTML = list.reduce((ac, cv) => {
    ac += itemTpl(cv);
    return ac;
  }, "");
  return itemListHTML;
};

const itemTpl = item => {
  console.log(item);
  const itemHTML = `
  <li>
  <div class="menu_item_wrap">
    <img class="menu_item_img" src="js/Model/images/main/${
      item.imgName
    }" alt="">
    <div class="menu_item_deskbox">
      <span class="menu_item_sp1">[${item.company}]${item.name} ${
    item.volume
  }</span>
      <span class="menu_item_sp2">${item.description}</span>
      <div class="menu_item_rate">
        <span class="menu_item_score">
          ${makeItemScoreByStars(item.star)}
          <span class="menu_item_star">${item.purchase}</span>
        </span>
        <span class="menu_item_price">${numberWithCommas(item.price)}원</span>
      </div>
    </div>
  </div>
  </li>
    `;
  return itemHTML;
};

function makeItemScoreByStars(star) {
  let result = "";
  for (let i = 5; i > 0; i--, star--) {
    result += star > 0 ? "<span>★</span>" : "<span>☆</span>";
  }
  return result;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
