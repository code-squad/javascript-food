import NUMBER from "../constants/NUMBER.js";

const KEYWORDS_KEY = "KEYWORDS_RECENT";
//  const CACHE_KEY = 'KEYWORDS_CACHE'
export default class Model {
  constructor(dataHelper) {
    this.dataHelper = dataHelper;
  }
  getLocalItem(keywordsKey = KEYWORDS_KEY) {
    return {
      keywordList: JSON.parse(localStorage.getItem(keywordsKey)) || {},
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
  searchKeyWord(keyword) {
    const { keywordList } = this.getLocalItem(keyword);
    return keywordList;
  }
  checkEmptyObj(obj) {
    return Object.keys(obj).length === NUMBER.ZERO;
  }
  saveCacheKeyWords(keyword, data) {
    const { keywordList } = this.getLocalItem(keyword);
    if (!this.checkEmptyObj(keywordList)) return;
    localStorage.setItem(keyword, JSON.stringify({ data, time: new Date().getTime() }));
  }
  checkOldData(oldOne) {
    const now = new Date().getTime();
    const timeGap = (now - oldOne) / (NUMBER.THOUSAND * NUMBER.HOURTOSEC);
    return timeGap > NUMBER.SIX;
  }
  handleDataProcess(keyword, getDataObj) {
    const cacheData = this.searchKeyWord(keyword);
    if (!this.checkEmptyObj(cacheData) && !this.checkOldData(cacheData.time)) {
      return cacheData;
    }
    this.handleAjax(getDataObj);
  }
  handleAjax(getDataObj) {
    this.dataHelper.sendReq({
      ...getDataObj,
    });
  }
}
