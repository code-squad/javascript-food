export const keyWordListTemplate = (keyword, keywordList) =>{
  const keyWordTempate = keywordList.reduce((ac, c) =>(ac += `<li><span>${c}</span></li>`),``);
  const keywordRegex = new RegExp(keyword, 'gi');
  return keyWordTempate.replace(keywordRegex, `<span class="hl">${keyword}</span>`)
}
