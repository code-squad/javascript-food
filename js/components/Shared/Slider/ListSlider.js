import { qs, $on } from '../../../helper/helper.js';
import { cardTemplate, slidEButtonTemplate } from './template/template.js';
import animations from '../../../helper/animation/raf.js';
// import { mockData } from '../../../../assets/data/mainSlide.js';
const initPosition = -980;
export default class ListSlider {
  constructor(slideSelector, dataHelper, url ) {
    this.slideEl = qs(slideSelector);
    this.url = url;
    this.dataHelper = dataHelper;
    this.maxIdx = null;
    this.currentIdx = 0;
    this.position = initPosition;
    this.init();
  }
  init(){
    this.dataHelper.sendReq('GET', this.url);
    this.dataHelper.getData = this.getData.bind(this);
  }
  setMaxIdx(length, items = 4){
    return this.maxIdx = Math.ceil(length/items)-1;
  }
  getData(data){
    this.renderSlides(data);
  }
  makeFakeData(data2){
    this.slideEl.insertAdjacentHTML('afterbegin', cardTemplate(data2.slice((this.maxIdx)*4)));
    this.slideEl.insertAdjacentHTML('beforeend', cardTemplate(data2.slice(0,4)));
  }
  renderSlides(data){
    const data2 = [...data, ...data]
    this.setMaxIdx(data2.length)
    this.slideEl.innerHTML = cardTemplate(data2);
    // animation을 위한 fakedata // 무한 롤링을 주기 위해서 first, last를 같 끝에 추가해줬습니다 .
    this.makeFakeData(data2);
    // renderButtons
    this.slideEl.parentElement.insertAdjacentHTML('afterend', slidEButtonTemplate);
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
    this.bindEvents();
  }
  bindEvents(){
    const slideButtonList = this.slideEl.parentElement.nextElementSibling;
    $on(qs('.right-button', slideButtonList), 'click', this.handleRightButtonClicked.bind(this));
    $on(qs('.left-button', slideButtonList), 'click', this.handleLeftButtonClicked.bind(this));
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
  handleRightButtonClicked(e){
      this.slideEl.style.transitionDuration = "0.5s";
      this.setCurrentIdx(this.currentIdx+1)
      this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
      
  }
  handleLeftButtonClicked(e){
    this.slideEl.style.transitionDuration = "0.5s";
    this.setCurrentIdx(this.currentIdx-1)
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
    if(this.isEdgeSlide()) $on(this.slideEl, 'transitionend', this.handleEdgeSlide.bind(this))
  }
}
