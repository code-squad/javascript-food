
export default class SearchFormModel {
  constructor() {
    this.id = 0;
    this.KeyList = []
  }
  saveKeyWords(data) {
    const key = `keyword-${this.id++}`;
    this.KeyList.push({key: data});
    localStorage.setItem(key, data)
  }
  getKeyWords(){
    const keyPrefix = `keyword-`
    const lastIdx = localStorage.length-1
    const keyWords = [];
    for(let i=lastIdx; i>=0; i--){
      keyWords.push(localStorage.getItem(`${keyPrefix}${i}`))
    }
    return keyWords
  }
}
