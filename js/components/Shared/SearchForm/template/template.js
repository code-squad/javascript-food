const recentKeyWord = (keywords)=>{
  return keywords.reduce((ac, c) =>(ac += `<li data-id=${c.id}><span>${c.keyword}</span></li>`),``);
}
const keyWord = (keywords)=>{
  return keywords.reduce((ac, c, ci) =>(ac += `<li data-id=${ci}><span>${c}</span></li>`),``);
}
const keyWordList = (keyword, keywordList) =>{
  const keyWordTempate = keyWordTemplate(keywordList)
  const keywordRegex = new RegExp(keyword, 'gi');
  return keyWordTempate.replace(keywordRegex, `<span class="hl">${keyword}</span>`)
}

export default {
  recentKeyWord,
  keyWord,
  keyWordList,
}