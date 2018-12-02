export const navTpl = navItemList =>
  navItemList.reduce((ac, cv) => {
    ac += `
  <li class="basic_item nav_list_item">
                <a class="nav_list_item_a" href=""><span>${cv.name}</span></a>
                <ul class="layer">
                  ${_insertItemList(cv.itemList)}
                </ul>
              </li>
  `;
    return ac;
  }, "");

const _insertItemList = itemList => {
  return itemList.reduce((ac, cv) => {
    ac += `<li><a href="">${cv}</a></li>`;
    return ac;
  }, "");
};
