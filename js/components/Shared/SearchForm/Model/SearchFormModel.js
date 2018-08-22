
import NUMBER from '../../../../constants/NUMBER.js';

 const KEYWORDS_KEY = 'KEYWORDS_KEY'

export default class SearchFormModel {
 
  getLocalItem(keywordsKey = KEYWORDS_KEY){
    return {
      keywordList: JSON.parse(localStorage.getItem(keywordsKey)) || [],
      keywordsKey,
    }
  }
  saveKeyWords(keyword) { 
    let {keywordsKey, keywordList } = this.getLocalItem();
    const keyWordCounts = keywordList.length
    // 중복 방지
    const hasSameData = keywordList.some(keywordData=>keywordData.keyword===keyword)
    if(hasSameData) return ;
    // 저장
    keywordList = [...keywordList, {id: keyWordCounts, keyword}]
    localStorage.setItem(keywordsKey, JSON.stringify(keywordList))
  }
  getKeyWords(recentShowItems = NUMBER.FIVE){
    const { keywordList } = this.getLocalItem();
    const keyWordCounts = keywordList.length
    if(keyWordCounts === NUMBER.ZERO) return;
    if(recentShowItems > keyWordCounts) return keywordList
    else return keywordList.slice(keyWordCounts-recentShowItems)
  }
}
