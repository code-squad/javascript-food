import { qs, $on } from '../../../helper/helper.js';
import { cardTemplate, slidEButtonTemplate, padTemplate } from './template/template.js';
import animations from '../../../helper/animation/raf.js';
// import { mockData } from '../../../../assets/data/mainSlide.js';

export default class ListSlider {
  constructor(slideSelector, dataHelper, url, initPosition = -980, listItemCounts = 4 ) {
    this.slideEl = qs(slideSelector);
    this.url = url;
    this.dataHelper = dataHelper;
    this.maxIdx = null;
    this.slideButtonList = null;
    this.currentIdx = 0;
    this.padElCounts = 0;
    this.initPosition = initPosition;
    this.position = this.initPosition;
    this.listItemCounts = listItemCounts;
    this.init();
  }
  init(){
    this.dataHelper.sendReq({
      "method": 'GET',
       "url" : this.url, 
       "successCallback" : this.getData.bind(this)
      });
  }
  setMaxIdx(length){
    return this.maxIdx = Math.ceil(length/this.listItemCounts)-1;
  }
  getData(data){
    this.renderSlides(data);
  }
  makeEdgeData(slideData){

    const padArr = [...new Array(this.padElCounts)]
    const padSlide = padTemplate(padArr)

    const firstSlide = padSlide+cardTemplate(slideData.slice(0,this.listItemCounts))
    const lastSlide = cardTemplate(slideData.slice(-this.listItemCounts+this.padElCounts))+padSlide

    this.slideEl.insertAdjacentHTML('beforeend', firstSlide);    
    this.slideEl.insertAdjacentHTML('afterbegin', lastSlide);
    
  }
  setPadCounts(length){
    return this.padElCounts = this.listItemCounts- (length % this.listItemCounts);
  }
  renderSlides(data){
    const changeLength = 3;
    const slideData = [...data, ...data.slice(changeLength)]
    const slidesCounts = slideData.length;

    this.setMaxIdx(slidesCounts)
    this.slideEl.innerHTML = cardTemplate(slideData);

    // animation을 위한 fakedata // 무한 롤링을 주기 위해서 first, last를 같 끝에 추가해줬습니다 .
    this.setPadCounts(slidesCounts)
    this.makeEdgeData(slideData);

    // renderButtons
    this.slideEl.parentElement.insertAdjacentHTML('afterend', slidEButtonTemplate);
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
    this.bindEvents();
  }
  bindEvents(){
    this.slideButtonList = this.slideEl.parentElement.nextElementSibling;
    $on(qs('.right-button',  this.slideButtonList), 'click', this.handleButtonClicked.bind(this));
    $on(qs('.left-button',  this.slideButtonList), 'click', this.handleButtonClicked.bind(this));
    $on(this.slideEl, 'transitionend', this.handleEdgeSlide.bind(this))
  }
  setPosition(idx){
    return this.position = this.initPosition + idx * (this.initPosition);
  }
  setCurrentIdx(idx){
    return this.currentIdx = idx;
  }
  isEdgeSlide(){
    return !!(this.currentIdx === -1 || this.currentIdx === this.maxIdx+1);
  }
  handleEdgeSlide(){
    this.setDisableButton('remove');
    if(!this.isEdgeSlide()) return;
    this.slideEl.style.transitionDuration = "0s";
    const idx = (this.currentIdx === -1) ? this.maxIdx : 0
    this.setCurrentIdx(idx);
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`
  }
  setDisableButton(type){
    const leftBtn = qs('.left-button',  this.slideButtonList);
    const rightBtn = qs('.right-button',  this.slideButtonList);
    leftBtn.classList[type]('disable-link')
    rightBtn.classList[type]('disable-link');
  }
  handleButtonClicked({target}){
    this.setDisableButton('add');
    // className보단 안 바뀔 data-속성으로 수정하였는데 left /right Method를 따로 빼는 방식이 더 좋을까요?
    const nextIdx = (target.dataset.id==="left") ? this.currentIdx-1 : this.currentIdx+1
    this.slideEl.style.transitionDuration = "0.5s";
    this.setCurrentIdx(nextIdx)
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
  }
}
