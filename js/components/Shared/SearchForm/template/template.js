export const recentKeyWordTemplate = (keywords)=>{
  return keywords.reduce((ac, c, ci) =>(ac += `<li data-id=${ci}><span>${c}</span></li>`),``);
}

export const keyWordListTemplate = (keyword, keywordList) =>{
  const keyWordTempate = recentKeyWordTemplate(keywordList)
  const keywordRegex = new RegExp(keyword, 'gi');
  return keyWordTempate.replace(keywordRegex, `<span class="hl">${keyword}</span>`)
}

