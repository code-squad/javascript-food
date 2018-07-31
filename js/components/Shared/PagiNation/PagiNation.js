import { qs,  $on } from '../../../helper/helper.js';
import { paginationTemplate } from '../../../../template/paginationTemplate.js';

export default class Pagination {
  constructor(paginationSelector, pageLength) {
    this.paginationEl = qs(paginationSelector);
    this.render(pageLength);
    this.bindEvents();
    this.sendIdx = null;
  }
  render(pageLength) {
    this.paginationEl.innerHTML = paginationTemplate([...new Array(pageLength).keys()])
  }
  bindEvents(){
    $on(this.paginationEl, 'click', this.notifyPage.bind(this))
  }
  notifyPage({target}){
    const pageBtn = target.closest('li')
    const id = qs('[data-id*="page-"]', pageBtn).dataset.id.split('-')[1]
    return this.sendIdx(+id);
  }
}
