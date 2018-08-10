import { qs,  $on } from '../../../helper/helper.js';
import { paginationTemplate } from '../../../../template/paginationTemplate.js';

export default class Pagination {
  constructor(paginationSelector) {
    this.currentIdx = 0;
    this.paginationEl = qs(paginationSelector);
  }
  init(pageLength){
    this.render(pageLength);
    this.bindEvents();
    this.sendIdx = null;
  }
  updateActiveIdx(idx){
    this.removeActiveClass(this.currentIdx);
    this.setActiveIdx(idx);
    this.setActiveClass(idx);
  }
  setActiveIdx(idx){
    this.currentIdx = idx;
  }
  render(pageLength) {
    this.paginationEl.innerHTML = paginationTemplate([...new Array(pageLength).keys()])
  }
  setActiveClass(idx){
    const targetPageBtn = qs(`[data-id="page-${idx}"]`,this.paginationEl);
    targetPageBtn.classList.add('now');
  }
  removeActiveClass(idx){
    const currentPageBtn = qs('.now', this.paginationEl);
    currentPageBtn.classList.remove('now');
  }
  bindEvents(){
    $on(this.paginationEl, 'click', this.notifyPage.bind(this))
  }
  notifyPage({target}){
    const pageBtn = target.closest('li')
    const idx = +qs('[data-id*="page-"]', pageBtn).dataset.id.split('-')[1] 
    this.updateActiveIdx(idx); 
    return this.sendIdx(this.currentIdx);
  }
}
