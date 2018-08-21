import { qs, $on } from '../../../helper/helper.js';
import Template from './template/template.js';

export default class SearchForm {
  constructor(searchFormSelector, dataHelper, url) {
    this.searchFormEl = qs(searchFormSelector)
    this.searchInputEl = qs('.search-input', this.searchFormEl)
    this.keyWordList = qs('.keyword-list', this.searchFormEl);
    this.dataHelper = dataHelper;
    this.active_KeyWordIdx = null;
    this.timer = null;
    this.url = url;
    this.init();
  }
  init(){
    this.bindEvents();
  }
  bindEvents(){
    $on(this.searchInputEl, 'keydown', (e)=>this.handleKeyDown(e))    
    $on(this.searchInputEl, 'input', (e)=>this.deBounceKeyEvents(e))
    $on(document.body, 'click', (e)=>this.handleResetKeyWord(e))
    $on(this.searchInputEl, 'click', e=>this.clickResetDisable(e))
    $on(qs('.search-button',this.searchFormEl), 'click', e=>this.clickResetDisable(e))
  }
  clickResetDisable(e){
    e.stopPropagation()
  }
  handleResetKeyWord(e){
    if(!this.hasKeyword()) return;
    this.resetKeyWordList();
  }
  bindSaveKeyWords(handler){
    $on(this.searchFormEl, 'submit', (e)=>{
      e.preventDefault();
      const keyword = this.searchInputEl.value.trim();
      keyword && handler(keyword);
      this.clearInput()
      this.resetKeyWordList();
    })    
  }
  clearInput(){
    this.searchInputEl.value="";
  }
  bindGetRecentKeyWords(handler){
    $on(this.searchInputEl, 'focus', (e)=>{
        if(e.target.value) return this.setAjax(e)
        const keyWords = handler();
        if(keyWords){
          this.showRenderKeyword();
          this.keyWordList.innerHTML = Template.recentKeyWord(keyWords);
        }
    })    
  }
  handleKeyDown(e){
    const {keyCode} = e;
    if(this.isUpDownKey(keyCode)) this.handleUpDownKeyPressed(keyCode)
    if(this.isCancelKey(keyCode)) this.resetKeyWordList();
  }
  isCancelKey(keyCode){
    return keyCode===27
  }
  isUpDownKey(keyCode){
    return keyCode===38|| keyCode === 40
  }
  handleUpDownKeyPressed(keyCode){
    if(!this.hasKeyword()) return;
    const type = keyCode===38 ? 'up' : 'down' 
    this.selectKeyWord(type);
  }
  deBounceKeyEvents(e){
    const event = e;
    this.timer && clearTimeout(this.timer);
    if(this.isUpDownKey(e.keyCode)) return;
    this.timer = setTimeout((e = event)=>this.setAjax(e), 200);
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
    this.keyWordList.innerHTML = Template.keyWordList(keyword, keywordList)
  }
  showRenderKeyword(){
    this.keyWordList.classList.remove('hide')
  }
}
