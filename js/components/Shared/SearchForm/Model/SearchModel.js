import Model from "../../../../Model/Model.js";
import NUMBER from "../../../../constants/NUMBER.js";

const KEYWORDS_KEY = "KEYWORDS_RECENT";

export default class SearchModel extends Model {
  constructor(dataHelper) {
    super(dataHelper);
  }
  saveKeyWords(keyword) {
    let { keywordsKey, keywordList } = this.getLocalItem(keyword);
    let id = 0;
    if (!this.checkEmptyObj(keywordList)) id = keywordList.data.length;

    // 중복 방지
    const hasSameData = keywordList.data.some(keywordData => keywordData.keyword === keyword);
    if (hasSameData) return;
    // 저장
    keywordList.data = [...keywordList.data, { id, keyword }];
    localStorage.setItem(keywordsKey, JSON.stringify(keywordList));
  }
  getKeyWords(recentShowItems = NUMBER.FIVE) {
    const { keywordList } = this.getLocalItem(KEYWORDS_KEY);
    if (this.checkEmptyObj(keywordList)) return;
    const keywordCounts = keywordList.data.length;
    if (recentShowItems > keywordCounts) return keywordList.data;
    else return keywordList.data.slice(keywordCounts - recentShowItems);
  }
}
