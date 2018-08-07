import { qs, $on } from '../../../helper/helper.js';
import { cardTemplate, slidEButtonTemplate, padTemplate } from './template/template.js';
import animations from '../../../helper/animation/raf.js';
// import { mockData } from '../../../../assets/data/mainSlide.js';
const initPosition = -980;
const showListItems = 4;
export default class ListSlider {
  constructor(slideSelector, dataHelper, url ) {
    this.slideEl = qs(slideSelector);
    this.url = url;
    this.dataHelper = dataHelper;
    this.maxIdx = null;
    this.currentIdx = 0;
    this.position = initPosition;
    this.padElCounts = 0;
    this.init();
  }
  init(){
    this.dataHelper.sendReq({
      "method": 'GET',
       "url" : this.url, 
       "successCallback" : this.getData.bind(this)
      });
  }
  setMaxIdx(length, items = 4){
    return this.maxIdx = Math.ceil(length/items)-1;
  }
  getData(data){
    this.renderSlides(data);
  }
  makeEdgeData(slideData){
    const padArr = [...new Array(this.padElCounts)]
    this.slideEl.insertAdjacentHTML('beforeend', padTemplate(padArr));
    this.slideEl.insertAdjacentHTML('beforeend', cardTemplate(slideData.slice(0,showListItems)));    
    this.slideEl.insertAdjacentHTML('afterbegin', padTemplate(padArr));
    this.slideEl.insertAdjacentHTML('afterbegin', cardTemplate(slideData.slice(-showListItems+this.padElCounts)));    
  }
  setPadCounts(length){
    return this.padElCounts = 4-length%4;
  }
  renderSlides(data){
    const slideData = [...data, ...data.slice(3)]
    this.setPadCounts(slideData.length)
    this.setMaxIdx(slideData.length)
    this.slideEl.innerHTML = cardTemplate(slideData);
    // animation을 위한 fakedata // 무한 롤링을 주기 위해서 first, last를 같 끝에 추가해줬습니다 .
    this.makeEdgeData(slideData);
    // renderButtons
    this.slideEl.parentElement.insertAdjacentHTML('afterend', slidEButtonTemplate);
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
    this.bindEvents();
  }
  bindEvents(){
    const slideButtonList = this.slideEl.parentElement.nextElementSibling;
    $on(qs('.right-button', slideButtonList), 'click', this.handleButtonClicked.bind(this));
    $on(qs('.left-button', slideButtonList), 'click', this.handleButtonClicked.bind(this));
    $on(this.slideEl, 'transitionend', this.handleEdgeSlide.bind(this))
  }
  setPosition(idx){
    return this.position = initPosition+ idx*(initPosition);
  }
  setCurrentIdx(idx){
    return this.currentIdx = idx;
  }
  isEdgeSlide(){
    return !!(this.currentIdx===-1 || this.currentIdx===this.maxIdx+1);
  }
  handleEdgeSlide(){
    if(!this.isEdgeSlide()) return;
    this.slideEl.style.transitionDuration = "0s";
    const idx = this.currentIdx===-1 ? this.maxIdx : 0
    this.setCurrentIdx(idx);
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`
  }
  handleButtonClicked({target}){
    const nextIdx = target.className==="left-button" ? this.currentIdx-1 : this.currentIdx+1
    this.slideEl.style.transitionDuration = "0.5s";
    this.setCurrentIdx(nextIdx)
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
  }
}
