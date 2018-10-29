import { ajax } from '../util.js';
import { slideTpl } from '../template/slideTpl.js';

export default class SlideContent {
    constructor({ slideListEl, url }) {
        this.slideListEl = slideListEl;
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
        const nextContentEl = this.slideListEl.children[2];

        this.render(preContentEl, this.contentData[this.getCurrentIdx()]);
        
        this.slideListEl.insertBefore(nextContentEl, preContentEl);
    }

    showNextContent() {
        const preContentEl = this.slideListEl.children[0];
        const nextContentEl = this.slideListEl.children[2];

        //그 다음에 보여줄 content를 render한다.
        this.render(nextContentEl, this.contentData[this.getCurrentIdx()]);
        //클래스이름을 next_content를 current_content로 current_content를 previous_content로 
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