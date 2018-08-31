export default class SearchFormController {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    view.bindSaveKeyWord(this.saveKeyWords.bind(this));
    view.bindGetRecentKeyWord(this.getRecentKeyWords.bind(this));
    view.bindGetData = this.getData.bind(this);
    view.bindSearchKeyWord = this.searchKeyWord.bind(this);
    view.bindSaveCacheKeyWords = this.saveCacheKeyWords.bind(this);
  }
  getData(keyword, getDataObj) {
    return this.model.handleDataProcess(keyword, getDataObj);
  }
  saveKeyWords(keyword) {
    this.model.saveKeyWords(keyword);
  }
  getRecentKeyWords() {
    return this.model.getKeyWords();
  }
  searchKeyWord(keyword) {
    return this.model.searchKeyWord(keyword);
  }
  saveCacheKeyWords(keyword, keywordList) {
    this.model.saveCacheKeyWords(keyword, keywordList);
  }
}
