import { $on, qs, qsa, pipe } from '../Util/helper.js'

export default class AutoComplete {
  constructor({ autoCompleteItemTpl, apiUrl }) {
    this.autoCompleteItemTpl = autoCompleteItemTpl;
    this.apiUrl = apiUrl;
  }

  init() {
    this._registerEvt();
  }

  _registerEvt() {
    $on(qs('.search_wrap'), 'keyup', this._keyUpHandler.bind(this));
    $on(qs('.search_bar_in'), 'input', this._renderAutoCompleteHandler.bind(this))
  }

  _keyUpHandler({ code }) {
    if (!qs('.search_auto_list').children.length) return;
    code === 'ArrowDown' ? this.downHighlight() :
      code === 'ArrowUp' ? this.upHighlight() :
        code === "Enter" ? this.enter() :
          null;
  }

  _renderAutoCompleteHandler(e) {
    fetch(`${this.apiUrl}/${e.target.value}`)
      .then(response => { return response.text(); })
      .then(response => {
        const autoCompleteTpl = pipe(JSON.parse, this._strongSameLiteral, this.autoCompleteItemTpl)(response);
        qs('.search_auto_list').innerHTML = autoCompleteTpl;
      }).catch(error => { });
  }

  _strongSameLiteral(parsedData) {
    return parsedData[1].map(v => {
      return v[0].replace(parsedData[0], `<strong>${parsedData[0]}</strong>`);
    });
  }

  enter() {
    const selectedItem = qs('.highlight').firstElementChild.innerText;
    qs('.search_bar_in').value = selectedItem;
    qs('.search_auto_list').innerHTML = '';
  }

  downHighlight() {
    if (!qs('.highlight')) {
      qs('.search_auto_list').firstElementChild.classList.add('highlight');
      return;
    }
    if (!qs('.highlight').nextElementSibling) return;
    qs('.highlight').nextElementSibling.classList.add('highlight');
    qsa('.highlight')[0].classList.remove('highlight');
  }

  upHighlight() {
    if (!qs('.highlight').previousElementSibling) return;
    qs('.highlight').previousElementSibling.classList.add('highlight');
    qsa('.highlight')[qsa('.highlight').length - 1].classList.remove('highlight')
  }

}
