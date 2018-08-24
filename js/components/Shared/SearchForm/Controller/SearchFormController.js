export default class SearchFormController {
  constructor({ view, model }) {
    this.view = view;
    this.model = model;
    view.bindSaveKeyWord(this.saveKeyWords.bind(this));
    view.bindGetRecentKeyWord(this.getRecentKeyWords.bind(this));
    view.bindSearchKeyWord = this.SearchKeyWord.bind(this);
    view.bindSaveCacheKeyWords = this.saveCacheKeyWords.bind(this);
  }
  saveKeyWords(keyword) {
    this.model.saveKeyWords(keyword);
  }
  getRecentKeyWords() {
    return this.model.getKeyWords();
  }
  SearchKeyWord(keyword) {
    return this.model.SearchKeyWord(keyword);
  }
  saveCacheKeyWords(keyword, keywordList) {
    this.model.saveCacheKeyWords(keyword, keywordList);
  }
}
