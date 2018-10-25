import { ajax, fadeIn, fadeOut } from '../util.js';
import { slideTpl } from '../template/slideTpl.js';

export default class SlideContent {
    constructor({ slideListEl, url, runTime = 1000 }) {
        this.slideListEl = slideListEl;
        this.runTime = runTime;
        ajax({
            'url': url,
            'requestType': 'GET',
            'handler': this.init.bind(this)
        });
        this.currentIdx = 0;
    }

    init(data) {
        const currentContentEl = this.slideListEl.children[1];
        this.setContentData(data);
        currentContentEl.innerHTML = slideTpl(this.contentData[this.getCurrentIdx()]);
    }

    showPreContent() {
        const preContentEl = this.slideListEl.children[0];
        const currentContentEl = this.slideListEl.children[1];
        const nextContentEl = this.slideListEl.children[2];

        this.render(preContentEl, this.contentData[this.getCurrentIdx()]);
        fadeIn(preContentEl, this.runTime);
        fadeOut(currentContentEl, this.runTime);
        this.slideListEl.insertBefore(nextContentEl, preContentEl);
    }

    showNextContent() {
        const preContentEl = this.slideListEl.children[0];
        const currentContentEl = this.slideListEl.children[1];
        const nextContentEl = this.slideListEl.children[2];

        //그 다음에 보여줄 content를 render한다.
        this.render(nextContentEl, this.contentData[this.getCurrentIdx()]);
        //다음에 보여줄 content를 fadeIn해주고 현재 content를 fadeOut해준다.
        fadeIn(nextContentEl, this.runTime);
        fadeOut(currentContentEl, this.runTime);
        //맨 앞자리의 li태그를 맨 뒷자리로 옮겨준다.
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
}