import TabView from './view/TabView.js';
import SlideContent from './view/slide/SlideContent.js';
import SlideDots from './view/slide/SlideDots.js';
import SlideNavi from './view/slide/SlideNavi.js';
import SlideController from './view/slide/SlideController.js';
import MenuSlide from './view/MenuSlide.js';
import ScrollBtnView from './view/ScrollBtnView.js';
import AutoComplete from './view/AutoComplete.js';

const _e = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best-seller-tab'),
    mainSlideEl: document.querySelector('.main-slide-wrap'),
    subSlideEl: document.querySelector('.sub-slide-wrap'),
    mainDishEl:document.querySelector(".dish-list-wrap.main-dish"),
    sideDishEl:document.querySelector(".dish-list-wrap.side-dish"),
    soupDishEl:document.querySelector(".dish-list-wrap.soup-dish"),
    courseDishEl:document.querySelector(".dish-list-wrap.course-dish"),
    scrollBtnEl:document.querySelector(".scroll"),
    searchBarEl:document.querySelector(".searchbar")
}

const contentURL = {
    bestSeller: 'http://crong.codesquad.kr:8080/woowa/best/',
    mainSlide: './jsonData/mainSlideData.json',
    subSlide: './jsonData/subSlideData.json',
    mainDish: 'http://crong.codesquad.kr:8080/woowa/main',
    slideDish: 'http://crong.codesquad.kr:8080/woowa/side',
    soupDish: 'http://crong.codesquad.kr:8080/woowa/soup',
    courseDish: 'http://crong.codesquad.kr:8080/woowa/course',
    autoComplete: 'http://crong.codesquad.kr:8080/ac/'
}

const tabView = new TabView({
    tabElement: _e.bestTabEl,
    urlRequestData: contentURL.bestSeller
});

const mainSlideContent = new SlideContent({
    slideListEl: _e.mainSlideEl.querySelector('.slide-list'),
    urlRequestData: contentURL.mainSlide
})
const mainSlideDots = new SlideDots({ dotListEl: _e.mainSlideEl.querySelector('.slide-dots') });
const mainSlideNavi = new SlideNavi({ naviEl: _e.mainSlideEl.querySelector('.slides-navi') });
const mainSlideContoller = new SlideController({
    slideContent: mainSlideContent,
    slideNavi: mainSlideNavi,
    slideDots: mainSlideDots,
    timer : 1000
});

const subSlideContent = new SlideContent({
    slideListEl: _e.subSlideEl.querySelector('.slide-list'),
    urlRequestData: contentURL.subSlide
})
const subSlideDots = new SlideDots({ dotListEl: _e.subSlideEl.querySelector('.slide-dots')});
const subSlideNavi = new SlideNavi({ naviEl : _e.subSlideEl.querySelector('.slides-navi')});
const subSlideController = new SlideController({
    slideContent: subSlideContent,
    slideNavi: subSlideNavi,
    slideDots: subSlideDots,
    timer : 500
})

const mainDishSlide = new MenuSlide({
    urlRequestData : contentURL.mainDish,
    slideListEl : _e.mainDishEl.querySelector('.slide-list'),
    naviEl : _e.mainDishEl.querySelector('.slides-navi'),
})

const sideDishSlide = new MenuSlide({
    urlRequestData : contentURL.mainDish,
    slideListEl : _e.sideDishEl.querySelector('.slide-list'),
    naviEl : _e.sideDishEl.querySelector('.slides-navi'),
})

const soupDishSlide = new MenuSlide({
    urlRequestData : contentURL.soupDish,
    slideListEl : _e.soupDishEl.querySelector('.slide-list'),
    naviEl : _e.soupDishEl.querySelector('.slides-navi'),
})

const courseDishSlide = new MenuSlide({
    urlRequestData : contentURL.courseDish,
    slideListEl : _e.courseDishEl.querySelector('.slide-list'),
    naviEl : _e.courseDishEl.querySelector('.slides-navi'),
})

const scrollBtnView = new ScrollBtnView({
    scrollEl : _e.scrollBtnEl
})

const autoComplete = new AutoComplete({
    searchBarEl : _e.searchBarEl,
    urlRequestData : contentURL.autoComplete
})

function init() {
    _e.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
}
init();