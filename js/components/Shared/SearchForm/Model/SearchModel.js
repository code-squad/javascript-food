import Model from "../../../../Model/Model.js";
import NUMBER from "../../../../constants/NUMBER.js";

const KEYWORDS_KEY = "KEYWORDS_RECENT";

export default class SearchModel extends Model {
  constructor(dataHelper) {
    super(dataHelper);
  }
  saveKeyWords(keyword) {
    let { keywordList } = this.getLocalItem(KEYWORDS_KEY);
    let id = NUMBER.ZERO;
    let data;
    // 중복 방지
    if (!this.checkEmptyObj(keywordList)) {
      const hasSameData = keywordList.data.some(keywordData => keywordData.keyword === keyword);
      if (hasSameData) return;
      else data = [...keywordList.data];
    } else data = [];

    if (data.length !== NUMBER.ZERO) id = data.length;
    // 저장
    data = [...data, { id, keyword, time: new Date().getTime() }];
    localStorage.setItem(KEYWORDS_KEY, JSON.stringify({ data }));
  }
  getKeyWords(recentShowItems = NUMBER.FIVE) {
    const { keywordList } = this.getLocalItem(KEYWORDS_KEY);
    if (this.checkEmptyObj(keywordList)) return;
    const keywordCounts = keywordList.data.length;
    if (recentShowItems > keywordCounts) return keywordList.data;
    else return keywordList.data.slice(keywordCounts - recentShowItems);
  }
}
