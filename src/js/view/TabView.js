import { itemListTpl, tabListTpl } from '../template/itemListTpl.js';
import { checkLocalItem, getLocalItem, pipe } from '../util.js'

export default class TabView {
    constructor({ bestSellerEl, urlRequestData }) {
        this.bestEl = bestSellerEl;
        this.bestTab = this.bestEl.querySelector('.best-seller-tab');
        this.url = urlRequestData;
        this.totalEvent();
    }

    totalEvent() {
        const event = {
            click: () => {
                this.bestTab.addEventListener('click', this.clickTabHandler.bind(this))
            },
            load: () => {
                document.body.addEventListener('load', this.init.bind(this))
            }
        }
        Object.keys(event).forEach(v => event[v]())
    }

    async clickTabHandler({ target }) {
        if (target.tagName !== "LI") return;
        if (await checkLocalItem(this.getUrl(this.getCategoryNo(target)))) return;
        this.showTabContentUI(target);
    }

    async init() {
        if (await checkLocalItem(this.url)) return;
        pipe(getLocalItem, tabListTpl, this.renderTab.bind(this))(this.url);
        const firstNode = this.bestTab.firstElementChild;
        if (await checkLocalItem(this.getUrl(this.getCategoryNo(firstNode)))) return;
        this.showTabContentUI(firstNode);
    }

    showTabContentUI(target) {
        const url = this.getUrl(this.getCategoryNo(target))
        this.blurTab();
        this.focusTab(target);
        pipe(getLocalItem, itemListTpl, this.renderContent.bind(this))(url);
    }

    focusTab(target) {
        target.classList.add('now');
    }

    blurTab() {
        const currentTab = this.bestEl.querySelector('.now')
        currentTab && currentTab.classList.remove('now');
    }

    getUrl(category_no) {
        return this.url + '/' + category_no;
    }

    getCategoryNo(target) {
        return target.getAttribute('category_no');
    }

    renderContent(data) {
        this.bestEl.querySelector('.best-list').innerHTML = data;
    }

    renderTab(data) {
        this.bestTab.innerHTML = data;
    }
}