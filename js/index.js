import TabView from './view/TabView.js';
import Transition from './view/Transition.js'

const elements = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best_seller_tab'),
    mainSlideContentList: document.querySelectorAll('.main_slide_wrap .main_slide_list li'),
    mainSlideDotList: document.querySelectorAll('.main_slide_wrap .slides_dots li')
}
const bestSellerURL = 'http://crong.codesquad.kr:8080/woowa/best/';

const tabView = new TabView({
    tabElement: elements.bestTabEl,
    url: bestSellerURL
});
const transition = new Transition(elements);

function init() {

    elements.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
    transition.init();
}

init();