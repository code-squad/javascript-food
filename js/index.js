import TabView from './view/TabView.js';
import SlideContent from './view/SlideContent.js';
import SlideDots from './view/SlideDots.js';
import SlideNavi from './view/SlideNavi.js';
import SlideController from './view/SlideController.js';

const elements = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best_seller_tab'),
    mainSlideEl: document.querySelector('.main_slide_wrap'),

}

const contentURL = {
    bestSeller: 'http://crong.codesquad.kr:8080/woowa/best/',
    mainSlide: './jsonData/mainSlideData.json'
}

const tabView = new TabView({
    tabElement: elements.bestTabEl,
    url: contentURL.bestSeller
});

const mainSlideContent = new SlideContent({
    slideListEl: elements.mainSlideEl.querySelector('.slide_list'),
    url: contentURL.mainSlide,
    runTime: 1000
})
const mainSlideDots = new SlideDots({ dotListEl: elements.mainSlideEl.querySelector('.slide_dots') });
const mainSlideNavi = new SlideNavi({ naviEl: elements.mainSlideEl.querySelector('.slides_navi') });
const slideContoller = new SlideController({
    slideContent: mainSlideContent,
    slideNavi: mainSlideNavi,
    slideDots: mainSlideDots
});


function init() {
    elements.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
}
init();