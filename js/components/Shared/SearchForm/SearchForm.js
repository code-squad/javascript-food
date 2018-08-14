import { qs, $on } from '../../../helper/helper.js';
import { keyWordListTemplate } from './template/template.js';

export default class SearchForm {
  constructor(searchFormSelector, dataHelper, url) {
    this.searchFormEl = qs(searchFormSelector)
    this.keyWordList = qs('.keyword-list', this.searchFormEl);
    this.dataHelper = dataHelper;
    this.url = url;
    this.init();
  }
  init(){
    this.bindEvents();
  }
  setAjax({target: {value}}){   
    this.dataHelper.sendReq({
      "method": 'GET',
        "url" : `${this.url}/${value}`, 
        "successCallback" : this.getData.bind(this)
      });
  }
  bindEvents(){
    $on(this.searchFormEl, 'keyup', (e)=>this.setAjax(e))    
    $on(this.searchFormEl, 'keydown', (e)=> this.handleKeyDown(e))
  }
  handleKeyDown(e){
  }
  getData(data){
    if(!Array.isArray(data)) return this.resetKeyWordList();
    const [keyword, keywordList] = data;
    this.renderKeyWordList(keyword,keywordList)
    this.showRenderKeyword();
  }
  resetKeyWordList(){
    this.keyWordList.innerHTML = "";
  }
  renderKeyWordList(keyword,keywordList){
    this.keyWordList.innerHTML = keyWordListTemplate(keyword, keywordList)
  }
  showRenderKeyword(){
    this.keyWordList.classList.remove('hide')
  }
}
