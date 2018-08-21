
export default class SearchFormModel {
  constructor() {
    this.key = 'keyword'
  }
  getLocalItem(){
    return JSON.parse(localStorage.getItem(this.key)) || []
  }
  saveKeyWords(keyword) { 
    let keywordList = this.getLocalItem();
    const keyWordCounts = keywordList.length
    // 중복 방지
    const hasSameData = keywordList.some(keywordData=>keywordData.keyword===keyword)
    if(hasSameData) return ;
    // 저장
    keywordList = [...keywordList, {id: keyWordCounts, keyword}]
    localStorage.setItem(this.key, JSON.stringify(keywordList))
  }
  getKeyWords(){
    let keywordList = this.getLocalItem();
    const keyWordCounts = keywordList.length
    const recentShowItems = 5;
    if(keyWordCounts === 0) return;
    if(recentShowItems > keyWordCounts) return keywordList
    else return keywordList.slice(keyWordCounts-recentShowItems)
  }
}
