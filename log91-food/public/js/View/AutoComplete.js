import { $on, qs, qsa, pipe, searchUpNode } from '../Util/helper.js'

export default class AutoComplete {
  constructor({ autoCompleteItemTpl, recentDataTpl, apiUrl }) {
    this.autoCompleteItemTpl = autoCompleteItemTpl;
    this.recentDataTpl = recentDataTpl;
    this.apiUrl = apiUrl;
  }

  init() {
    this._registerEvt();
  }

  _registerEvt() {
    // autoComplete
    $on(qs('body'), 'click', this._removeAutoListWhenClickedAnother.bind(this));
    $on(qs('.search_wrap'), 'keyup', this._keyUpHandler.bind(this));
    $on(qs('.search_bar_in'), 'input', this._renderAutoCompleteHandler.bind(this));

    // recentItem
    $on(qs('.search_bar_in'), 'focus', this._renderRecentItem.bind(this));
    $on(qs('.search_icon'), 'click', this._saveItemInLocalStorage)
  }

  _renderRecentItem(e, MAX_LENGTH = 5) {
    if (!localStorage['recent']) return;
    const autoCompleteTpl = this.recentDataTpl(JSON.parse(localStorage['recent']).slice(0, MAX_LENGTH));
    qs('.search_auto_list').innerHTML = autoCompleteTpl;
  }

  _saveItemInLocalStorage(e) {
    e.preventDefault();
    if (!qs('.search_bar_in').value.trim()) return;
    localStorage.getItem('recent') || localStorage.setItem('recent', JSON.stringify([]));
    const existData = JSON.parse(localStorage.getItem('recent'));
    const addedData = ([qs('.search_bar_in').value]).concat(existData);
    localStorage.setItem('recent', JSON.stringify(addedData));
  }

  _removeRecentListHandler() {
    localStorage.clear();
    this.removeAutoList();
  }

  _keyUpHandler({ code }) {
    if (!qs('.search_auto_list').children.length) return;
    code === 'ArrowDown' ? this.downHighlight() :
      code === 'ArrowUp' ? this.upHighlight() :
        code === "Enter" ? this.enter() :
          null;
  }

  async _renderAutoCompleteHandler(e) {
    try {
      const response = await fetch(`${this.apiUrl}/${e.target.value}`);
      const autoData = await response.text();
      const autoCompleteTpl = pipe(JSON.parse, this._strongSameLiteral, this.autoCompleteItemTpl)(autoData);
      qs('.search_auto_list').innerHTML = autoCompleteTpl;
    } catch{ }
  }

  _removeAutoListWhenClickedAnother({ target }) {
    searchUpNode(target, 'search_bar') || this.removeAutoList();
  }

  _strongSameLiteral(parsedData) {
    return parsedData[1].map(v => {
      return v[0].replace(parsedData[0], `<strong>${parsedData[0]}</strong>`);
    });
  }

  enter() {
    if (!qs('.highlight')) return;
    if (qs('.highlight').classList.contains('remove_recent')) {
      this._removeRecentListHandler();
      return;
    }
    const selectedItem = qs('.highlight').firstElementChild.innerText;
    qs('.search_bar_in').value = selectedItem;
    this.removeAutoList();
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

  removeAutoList() {
    qs('.search_auto_list').innerHTML = '';
  }
}
