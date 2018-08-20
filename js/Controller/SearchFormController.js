
export default class SearchFormController {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    view.bindSaveKeyWords(this.saveKeyWords.bind(this))
    view.bindGetRecentKeyWords(this.getRecentKeyWords.bind(this))
  }
  saveKeyWords(keyword) {
    this.model.saveKeyWords(keyword)
  }
  getRecentKeyWords(){
    return this.model.getKeyWords()
  }
}
