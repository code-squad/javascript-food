export function autoCompleteItemTpl(data) {
  return data.reduce((ac, cv) => {
    ac += `<div class="search_auto_drop"><span class="search_auto_drop_sp">${cv}</span></div>`
    return ac;
  }, '');
}