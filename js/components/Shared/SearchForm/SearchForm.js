import { qs, $on } from '../../../helper/helper.js';
import { keyWordListTemplate } from './template/template.js';

export default class SearchForm {
  constructor(searchFormSelector, dataHelper, url) {
    this.searchFormEl = qs(searchFormSelector)
    this.searchInputEl = qs('.search-input', this.searchFormEl)
    this.keyWordList = qs('.keyword-list', this.searchFormEl);
    this.dataHelper = dataHelper;
    this.active_KeyWordIdx = null;
    this.beforeComposition = null;
    this.url = url;
    this.init();
  }
  init(){
    this.bindEvents();
  }
  bindEvents(){
    $on(this.searchInputEl, 'keydown', (e)=>this.handleSubmit(e))    
    $on(this.searchInputEl, 'keyup', (e)=>this.handleKeyup(e))    
  }
  handleSubmit(e){
    if(e.keyCode===13){
      e.preventDefault();
      this.resetKeyWordList();
    }
  }
  isUpDownKey(keyCode){
    return keyCode===38|| keyCode === 40
  }
  toggleOnce(){
    return this.once = !this.once;
  }
  handleUpDownKeyPressed(keyCode){
    if(!this.hasKeyword()) return;
    const type = keyCode===38 ? 'up' : 'down' 
    this.selectKeyWord(type);
  }
  handleKeyup(e){
    if(this.isUpDownKey(e.keyCode)){
      if(!e.isComposing&&(!this.beforeComposition)) this.handleUpDownKeyPressed(e.keyCode);
      this.beforeComposition = e.isComposing;
    } 
    else {
      this.beforeComposition = e.isComposing;
      return this.setAjax(e)
    }
  }
  setAjax({target: {value}}){ 
    this.dataHelper.sendReq({
      "method": 'GET',
        "url" : `${this.url}/${value}`, 
        "successCallback" : this.getData.bind(this)
      });
  }
  isActiveKeywordNull(){
    return this.active_KeyWordIdx === null
  }
  selectKeyWord(type){
    if(this.isActiveKeywordNull()) this.handleInitSelected(type) 
    else this.handleChangeSelected(type)
  }
  handleChangeSelected(type){
    this.clearActiveClass(qs(`[data-id="${this.active_KeyWordIdx}"]`, this.keyWordList))
    this.handleChoseActiveIdx(type)
    const willActiveEl = qs(`[data-id="${this.active_KeyWordIdx}"]`, this.keyWordList)
    this.addActiveClass(willActiveEl)
    this.setInputTextByActiveText(willActiveEl.innerText)
  }
  setInputTextByActiveText(text){
    this.searchInputEl.value = text;
  }
  handleChoseActiveIdx(type){
    const firstIdx = 0;
    const lastIdx = this.keyWordList.children.length-1
    const change = type === 'up' ? -1 : 1 
    let choseIdx = this.active_KeyWordIdx+change
    if(choseIdx<firstIdx) choseIdx = lastIdx
    else if(choseIdx > lastIdx) choseIdx = 0;
    this.set_Active_KeyWordIdx(choseIdx)
  }
  set_Active_KeyWordIdx(idx){
    return this.active_KeyWordIdx = idx;
  }
  setActive_KeyWordListItem(idx, el){
    this.set_Active_KeyWordIdx(idx)
    this.addActiveClass(el)
    this.setInputTextByActiveText(el.innerText);
  }
  handleInitSelected(type){
    const lastIdx = this.keyWordList.children.length-1
    const firstIdx = 0;
    if(type==='up') this.setActive_KeyWordListItem(lastIdx, qs(`[data-id="${lastIdx}"]`, this.keyWordList))
    else this.setActive_KeyWordListItem(firstIdx, qs(`[data-id="${firstIdx}"]`, this.keyWordList)) 
  }
  addActiveClass(el){
    el.classList.add('active');
  }
  clearActiveClass(el){
    el.classList.remove('active');
  }
  hasKeyword(){
    return this.keyWordList.hasChildNodes()
  }
  getData(data){
    if(!Array.isArray(data)) return this.resetKeyWordList();
    const [keyword, keywordList] = data;
    this.renderKeyWordList(keyword,keywordList)
    this.showRenderKeyword();
  }
  resetKeyWordList(){
    this.set_Active_KeyWordIdx(null)
    this.keyWordList.innerHTML = "";
  }
  renderKeyWordList(keyword,keywordList){
    this.keyWordList.innerHTML = keyWordListTemplate(keyword, keywordList)
  }
  showRenderKeyword(){
    this.keyWordList.classList.remove('hide')
  }
}
