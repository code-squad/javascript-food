import TabView from './view/TabView.js';
import SlideContent from './view/SlideContent.js';
import SlideDots from './view/SlideDots.js';
import SlideNavi from './view/SlideNavi.js';
import SlideController from './view/SlideController.js';

const elements = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best_seller_tab'),
    mainSlideEl: document.querySelector('.main_slide_wrap'),
    subSlideEl: document.querySelector('.sub_slide_wrap')
}

const contentURL = {
    bestSeller: 'http://crong.codesquad.kr:8080/woowa/best/',
    mainSlide: './jsonData/mainSlideData.json',
    subSlide: './jsonData/subSlideData.json'
}

const tabView = new TabView({
    tabElement: elements.bestTabEl,
    url: contentURL.bestSeller
});

const mainSlideContent = new SlideContent({
    slideListEl: elements.mainSlideEl.querySelector('.slide_list'),
    url: contentURL.mainSlide
})
const mainSlideDots = new SlideDots({ dotListEl: elements.mainSlideEl.querySelector('.slide_dots') });
const mainSlideNavi = new SlideNavi({ naviEl: elements.mainSlideEl.querySelector('.slides_navi') });
const mainSlideContoller = new SlideController({
    slideContent: mainSlideContent,
    slideNavi: mainSlideNavi,
    slideDots: mainSlideDots
});

const subSlideContent = new SlideContent({
    slideListEl: elements.subSlideEl.querySelector('.slide_list'),
    url: contentURL.subSlide
})
const subSlideDots = new SlideDots({ dotListEl: elements.subSlideEl.querySelector('.slide_dots')});
const subSlideNavi = new SlideNavi({ naviEl : elements.subSlideEl.querySelector('.slides_navi')});
const subSlideController = new SlideController({
    slideContent: subSlideContent,
    slideNavi: subSlideNavi,
    slideDots: subSlideDots
})


function init() {
    elements.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
}
init();