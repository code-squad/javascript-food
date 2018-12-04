import { checkLocalItem, getLocalItem } from '../../util.js';
import { slideTpl } from '../../template/slideTpl.js';

export default class SlideContent {
    constructor({ slideListEl, urlRequestData }) {
        this.slideListEl = slideListEl;
        this.currentIdx = 0;
        this.init(urlRequestData);
    }

    async init(url) {
        if (await checkLocalItem(url)) return;
        this.setContentData(getLocalItem(url));
        const currentContentEl = this.slideListEl.children[1];
        this.render(currentContentEl, this.getCurrentContent());
    }

    showPreContent() {
        const preContentEl = this.slideListEl.children[0];
        const nextContentEl = this.slideListEl.children[2];

        this.render(preContentEl, this.getCurrentContent());

        this.slideListEl.insertBefore(nextContentEl, preContentEl);
    }

    showNextContent() {
        const preContentEl = this.slideListEl.children[0];
        const nextContentEl = this.slideListEl.children[2];

        //그 다음에 보여줄 content를 render한다.
        this.render(nextContentEl, this.getCurrentContent());
        //맨앞에 있는 li엘리먼트를 맨 마지막 순서로 옮겨준다. 
        this.slideListEl.appendChild(preContentEl);
    }

    render(element, data) {
        element.innerHTML = slideTpl(data);
    }

    setContentData(contentData) {
        this.contentData = contentData;
    }

    setCurrentIdx(index) {
        this.currentIdx = index;
    }

    getCurrentIdx() {
        const contentCount = this.contentData.length;
        this.currentIdx = this.currentIdx < 0 ? contentCount - 1 : this.currentIdx % contentCount;
        return this.currentIdx;
    }

    getCurrentContent() {
        return this.contentData[this.getCurrentIdx()];
    }
}