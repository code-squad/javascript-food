import TabView from './view/TabView.js';
import SlideContent from './view/SlideContent.js';
import SlideDots from './view/SlideDots.js';
import SlideNavi from './view/SlideNavi.js';
import SlideController from './view/SlideController.js';
import MenuSlide from './view/MenuSlide.js';

const elements = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best-seller-tab'),
    mainSlideEl: document.querySelector('.main-slide-wrap'),
    subSlideEl: document.querySelector('.sub-slide-wrap'),
    mainDishEl:document.querySelector(".dish-list-wrap[data-index='0']"),
    sideDishEl:document.querySelector(".dish-list-wrap[data-index='1']"),
    soupDishEl:document.querySelector(".dish-list-wrap[data-index='2']"),
    courseDishEl:document.querySelector(".dish-list-wrap[data-index='3']")
}

const contentURL = {
    bestSeller: 'http://crong.codesquad.kr:8080/woowa/best/',
    mainSlide: './jsonData/mainSlideData.json',
    subSlide: './jsonData/subSlideData.json',
    mainDish: 'http://crong.codesquad.kr:8080/woowa/main',
    slideDish: 'http://crong.codesquad.kr:8080/woowa/side',
    soupDish: 'http://crong.codesquad.kr:8080/woowa/soup',
    courseDish: 'http://crong.codesquad.kr:8080/woowa/course'
}

const tabView = new TabView({
    tabElement: elements.bestTabEl,
    urlRequestData: contentURL.bestSeller
});

const mainSlideContent = new SlideContent({
    slideListEl: elements.mainSlideEl.querySelector('.slide-list'),
    urlRequestData: contentURL.mainSlide
})
const mainSlideDots = new SlideDots({ dotListEl: elements.mainSlideEl.querySelector('.slide-dots') });
const mainSlideNavi = new SlideNavi({ naviEl: elements.mainSlideEl.querySelector('.slides-navi') });
const mainSlideContoller = new SlideController({
    slideContent: mainSlideContent,
    slideNavi: mainSlideNavi,
    slideDots: mainSlideDots
});

const subSlideContent = new SlideContent({
    slideListEl: elements.subSlideEl.querySelector('.slide-list'),
    urlRequestData: contentURL.subSlide
})
const subSlideDots = new SlideDots({ dotListEl: elements.subSlideEl.querySelector('.slide-dots')});
const subSlideNavi = new SlideNavi({ naviEl : elements.subSlideEl.querySelector('.slides-navi')});
const subSlideController = new SlideController({
    slideContent: subSlideContent,
    slideNavi: subSlideNavi,
    slideDots: subSlideDots
})

const mainDishSlide = new MenuSlide({
    urlRequestData : contentURL.mainDish,
    slideListEl : elements.mainDishEl.querySelector('.slide-list'),
    naviEl : elements.mainDishEl.querySelector('.slides-navi'),
})

const sideDishSlide = new MenuSlide({
    urlRequestData : contentURL.mainDish,
    slideListEl : elements.sideDishEl.querySelector('.slide-list'),
    naviEl : elements.sideDishEl.querySelector('.slides-navi'),
})

const soupDishSlide = new MenuSlide({
    urlRequestData : contentURL.soupDish,
    slideListEl : elements.soupDishEl.querySelector('.slide-list'),
    naviEl : elements.soupDishEl.querySelector('.slides-navi'),
})

const courseDishSlide = new MenuSlide({
    urlRequestData : contentURL.courseDish,
    slideListEl : elements.courseDishEl.querySelector('.slide-list'),
    naviEl : elements.courseDishEl.querySelector('.slides-navi'),
})

function init() {
    elements.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
}
init();