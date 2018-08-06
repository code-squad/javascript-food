import { qs, $on } from '../../../helper/helper.js';
import { cardTemplate, slidEButtonTemplate } from './template/template.js';
import animations from '../../../helper/animation/raf.js';
// import { mockData } from '../../../../assets/data/mainSlide.js';

export default class ListSlider {
  constructor(slideSelector, dataHelper, url ) {
    this.slideEl = qs(slideSelector);
    this.url = url;
    this.dataHelper = dataHelper;
    this.maxIdx = null;
    this.currentIdx = 0;
    this.position = 0;
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
  renderSlides(data){
    this.setMaxIdx(data.length)
    this.slideEl.innerHTML = cardTemplate(data);
    this.slideEl.parentElement.insertAdjacentHTML('afterend', slidEButtonTemplate);
    this.bindEvents();
    this.slideEl.style.transition = 'all 0.5s ease';
  }
  bindEvents(){
    const slideButtonList = this.slideEl.parentElement.nextElementSibling;
    $on(qs('.right-button', slideButtonList), 'click', this.handleRightButtonClicked.bind(this));
    $on(qs('.left-button', slideButtonList), 'click', this.handleLeftButtonClicked.bind(this));
  }
  setPosition(idx){
    return this.position = idx*(-980);
  }
  setCurrentIdx(idx){
    return this.currentIdx = idx;
  }
  handleRightButtonClicked(e){
    this.setCurrentIdx(this.currentIdx+1)
    if(this.currentIdx > this.maxIdx) this.setCurrentIdx(0)
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
  }
  handleLeftButtonClicked(e){
    this.setCurrentIdx(this.currentIdx-1)
    if(this.currentIdx < 0) this.setCurrentIdx(this.maxIdx)
    this.slideEl.style.transform = `translateX(${this.setPosition(this.currentIdx)}px)`;
  }
}
