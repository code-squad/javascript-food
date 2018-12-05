function autoCompleteItemTpl(data) {
  return data.reduce((ac, cv) => {
    ac += `<div class="search_auto_drop"><span class="search_auto_drop_sp">${cv}</span></div>`
    return ac;
  }, '');
}

function recentDataTpl(data) {
  return autoCompleteItemTpl(data) + `<div class="search_auto_drop remove_recent"><span class="search_auto_drop_sp">최근 기록 비우기</span></div>`
}

export { autoCompleteItemTpl, recentDataTpl };