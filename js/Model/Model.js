import NUMBER from "../constants/NUMBER.js";

const KEYWORDS_KEY = "KEYWORDS_RECENT";
//  const CACHE_KEY = 'KEYWORDS_CACHE'
export default class Model {
  getLocalItem(keywordsKey = KEYWORDS_KEY) {
    return {
      keywordList: JSON.parse(localStorage.getItem(keywordsKey)) || [],
      keywordsKey,
    };
  }
  saveKeyWords(keyword) {
    let { keywordsKey, keywordList } = this.getLocalItem();
    const keyWordCounts = keywordList.length;
    // 중복 방지
    const hasSameData = keywordList.some(keywordData => keywordData.keyword === keyword);
    if (hasSameData) return;
    // 저장
    keywordList = [...keywordList, { id: keyWordCounts, keyword }];
    localStorage.setItem(keywordsKey, JSON.stringify(keywordList));
  }
  getKeyWords(recentShowItems = NUMBER.FIVE) {
    const { keywordList } = this.getLocalItem();
    const keyWordCounts = keywordList.length;
    if (keyWordCounts === NUMBER.ZERO) return;
    if (recentShowItems > keyWordCounts) return keywordList;
    else return keywordList.slice(keyWordCounts - recentShowItems);
  }
  SearchKeyWord(keyword) {
    const { keywordList } = this.getLocalItem(keyword);
    return keywordList;
  }
  saveCacheKeyWords(keyword, ajaxKeywordList) {
    const { keywordList } = this.getLocalItem(keyword);
    if (keywordList.length !== NUMBER.ZERO) return;
    localStorage.setItem(keyword, JSON.stringify(ajaxKeywordList));
  }
}
