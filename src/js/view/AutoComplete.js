import { searchListTpl, recentListTpl } from '../template/searchListTpl.js'
import { debounce, showElement, hideElement, pipe, checkLocalItem, getLocalItem, setLocalItem } from '../util.js'
export default class AutoComplete {
    constructor({ searchBarEl, urlRequestData, debounceTime = 200 }) {
        this.searchBarEl = searchBarEl;
        this.urlRequestData = urlRequestData;

        this._el = {
            searchbar: this.searchBarEl,
            input: this.searchBarEl.querySelector('input'),
            searchList: this.searchBarEl.querySelector('.search-list'),
            submit: this.searchBarEl.querySelector('button')
        };
        this.selectedEl = null;
        this.totalEvent(debounceTime)
    }

    totalEvent(timer) {

        const event = {
            input: () => {
                this._el.input.addEventListener('input', debounce(this.inputEventHandler.bind(this), timer))
            },
            focus: () => {
                this._el.input.addEventListener('focus', this.focusEventHandler.bind(this))
            },
            click: () => {
                this._el.searchList.addEventListener('click', this.clickSearchListHandler.bind(this))
                this._el.submit.addEventListener('click', this.clickSubmitHandler.bind(this))
            },
            clickAnotherArea: () => {
                document.body.addEventListener('click', this.clickAnotherAreaHanlder.bind(this))
            },
            keyup: () => {
                this._el.searchbar.addEventListener('keyup', this.keyupHandler.bind(this))
            },
            hover: () => {
                this._el.searchList.addEventListener('mouseover', this.mouseoverEventHandler.bind(this))
                this._el.searchList.addEventListener('mouseleave', this.mouseleaveEventHandler.bind(this))
            }
        }

        Object.keys(event).forEach(v => event[v]())
    }

    focusEventHandler() {
        showElement(this._el.searchList)
        !this._el.input.value && this.renderRecentList();
    }

    clickAnotherAreaHanlder({ target }) {
        target.parentElement !== this._el.searchList && target !== this._el.input && hideElement(this._el.searchList);
    }

    clickSearchListHandler({ target }) {
        if (target.tagName !== "LI") return;
        this.inputValue();
        hideElement(target.parentElement);
    }

    clickSubmitHandler({ target }) {
        if (target.tagName !== "BUTTON") return;
        this.saveRecentList();
        this.resetValue();
    }

    async inputEventHandler({ target }) {
        if (!this._el.input.value) return this.renderRecentList()
        if (await checkLocalItem(this.getRequestUrl(target.value))) return;
        pipe(getLocalItem, searchListTpl, this.render.bind(this))(this.getRequestUrl(target.value))
    }

    mouseoverEventHandler({ target }) {
        if (target.tagName !== 'LI') return;
        this.removeSelectedClassName();
        this.addSelectedClassName(target);
    }

    mouseleaveEventHandler() {
        this.removeSelectedClassName();
        this.resetSelectedElement();
    }

    keyupHandler({ key }) {
        if (key === "ArrowUp" || key === "ArrowDown") this.arrowkeyHandler(key)
        if (key === "Enter") this.enterkeyHandler()
    }

    arrowkeyHandler(key) {
        let selectedEl
        key === "ArrowUp" ?
            selectedEl = this.selectedEl ? this.selectedEl.previousSibling : this._el.searchList.lastChild
            : selectedEl = this.selectedEl ? this.selectedEl.nextSibling : this._el.searchList.firstChild
        this.removeSelectedClassName();
        this.addSelectedClassName(selectedEl);
    }

    enterkeyHandler() {
        this.inputValue();
        hideElement(this._el.searchList);
    }

    addSelectedClassName(target) {
        this.selectedEl = target;
        this.selectedEl && this.selectedEl.classList.add('selected');
    }

    removeSelectedClassName() {
        this.selectedEl && this.selectedEl.classList.remove('selected');
    }

    inputValue() {
        this._el.input.value = this.selectedEl.innerText;
    }

    saveRecentList() {
        let recentList = getLocalItem('recentList') || [];
        recentList.unshift(this._el.input.value);
        setLocalItem('recentList', recentList.slice(0, 5));
    }

    renderRecentList() {
        getLocalItem('recentList') && pipe(getLocalItem, recentListTpl, this.render.bind(this))('recentList')
    }

    resetValue() {
        this._el.input.value = "";
    }

    resetSelectedElement() {
        this.selectedEl = null;
    }

    getRequestUrl(value) {
        return this.urlRequestData + value;
    }

    render(data) {
        this._el.searchList.innerHTML = data;
    }
}