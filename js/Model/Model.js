import NUMBER from "../constants/NUMBER.js";
export default class Model {
  constructor(dataHelper) {
    this.dataHelper = dataHelper;
  }
  getLocalItem(keywordsKey) {
    return {
      keywordList: JSON.parse(localStorage.getItem(keywordsKey)) || {},
      keywordsKey,
    };
  }
  searchKeyWord(keyword) {
    const { keywordList } = this.getLocalItem(keyword);
    if (this.checkEmptyObj(keywordList)) return null;
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
    if (cacheData && !this.checkOldData(cacheData.time)) {
      return cacheData;
    } else this.handleAjax(getDataObj);
  }
  handleAjax(getDataObj) {
    this.dataHelper.sendReq({
      ...getDataObj,
    });
  }
}
