import { itemListTpl } from '../template/itemListTpl.js';
import { ajax } from '../util.js';

export default class TabView {
    constructor({ bestSellerEl, urlRequestData }) {
        this.bestEl = bestSellerEl;
        this.bestTab = this.bestEl.querySelector('.best-seller-tab');
        this.url = urlRequestData;
        this.totalEvent();
    }

    init() {
        const firstNode = this.tabEl.firstElementChild;
        this.focusTab(firstNode);
        ajax({
            url: this.getUrl(this.getCategoryNo(firstNode)),
            handler: this.render.bind(this),
            requestType: "GET"
        })
        this.clickTab();
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

    clickTab() {
        this.tabEl.addEventListener('click', ({ target }) => {
            this.focusTab(target);
            ajax({
                url: this.getUrl(this.getCategoryNo(target)),
                handler: this.render.bind(this),
                requestType: 'GET'
            });
        })
    }

    focusTab(target) {
        this.blurTab();
        target.classList.add('now');
    }

    blurTab() {
        const childNodes = this.tabEl.querySelectorAll('li');
        childNodes.forEach(v => v.classList.remove('now'));
    }

    getUrl(category_no) {
        return this.url + category_no;
    }

    getCategoryNo(target) {
        return target.getAttribute('data-category_no');
    }

    render({ items }) {
        const bestListEl = this.tabEl.nextElementSibling;
        bestListEl.innerHTML = itemListTpl(items);
    }
}