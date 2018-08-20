
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
    const lastIdx = localStorage.length-1;
    return [...new Array(lastIdx).keys()].map(i=>localStorage.getItem(`${keyPrefix}${i}`))   
  }
}
