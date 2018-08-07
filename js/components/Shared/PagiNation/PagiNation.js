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
    const currentList = this.paginationEl.children[idx]
    currentList.children[0].classList.add('now');
  }
  removeActiveClass(idx){
    const currentList = this.paginationEl.children[idx]
    currentList.children[0].classList.remove('now');
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
