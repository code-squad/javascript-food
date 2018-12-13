import { qs } from '../Util/helper.js'

export default class LocalStorage {
  constructor() { }

  render({ key, tpl, targetNode, listLength }) {
    if (!localStorage[key]) return;
    const recentItemList = tpl(JSON.parse(localStorage[key]).slice(0, listLength))
    targetNode.innerHTML = recentItemList;
  }

  save({ key, targetNode, }, e) {
    e.preventDefault();
    if (!targetNode.value.trim()) return;
    localStorage.getItem(key) || localStorage.setItem(key, JSON.stringify([]));
    const existData = JSON.parse(localStorage.getItem(key));
    const addedData = ([targetNode.value]).concat(existData);
    localStorage.setItem(key, JSON.stringify(addedData));
  }

  clear() {
    localStorage.clear();
  }
}