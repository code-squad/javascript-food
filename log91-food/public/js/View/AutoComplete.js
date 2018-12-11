import { $on, qs, qsa, pipe, searchUpNode } from '../Util/helper.js'

export default class AutoComplete {
  constructor({ autoCompleteItemTpl, recentDataTpl, apiUrl, storage }) {
    this.autoCompleteItemTpl = autoCompleteItemTpl;
    this.recentDataTpl = recentDataTpl;
    this.apiUrl = apiUrl;
    this.storage = storage;
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
    $on(qs('.search_bar_in'), 'focus',
      this.storage.render.bind(this.storage,
        { key: 'recent', targetNode: qs('.search_auto_list'), tpl: this.recentDataTpl, listLength: 5 }));
    $on(qs('.search_icon'), 'click', this.storage.save.bind(this.storage,
      { key: 'recent', targetNode: qs('.search_bar_in') }));
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
      this.storage.clear();
      this.removeAutoList();
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
    if (!qs('.highlight') || !qs('.highlight').previousElementSibling) return;
    qs('.highlight').previousElementSibling.classList.add('highlight');
    qsa('.highlight')[qsa('.highlight').length - 1].classList.remove('highlight')
  }

  removeAutoList() {
    qs('.search_auto_list').innerHTML = '';
  }
}
