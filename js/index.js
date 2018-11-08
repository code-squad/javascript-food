import TabView from './view/TabView.js';
import SlideContent from './view/SlideContent.js';
import SlideDots from './view/SlideDots.js';
import SlideNavi from './view/SlideNavi.js';
import SlideController from './view/SlideController.js';
import MenuSlide from './view/MenuSlide.js';

const elements = {
    body: document.querySelector('body'),
    bestTabEl: document.querySelector('.best_seller_tab'),
    mainSlideEl: document.querySelector('.main_slide_wrap'),
    subSlideEl: document.querySelector('.sub_slide_wrap'),
    mainDishEl:document.querySelector(".dish_list_wrap[data-index='0']"),
    sideDishEl:document.querySelector(".dish_list_wrap[data-index='1']"),
    soupDishEl:document.querySelector(".dish_list_wrap[data-index='2']"),
    courseDishEl:document.querySelector(".dish_list_wrap[data-index='3']")
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

const mainDishSlide = new MenuSlide({
    url : contentURL.mainDish,
    slideListEl : elements.mainDishEl.querySelector('.slide_list'),
    naviEl : elements.mainDishEl.querySelector('.slides_navi'),
})

const sideDishSlide = new MenuSlide({
    url : contentURL.mainDish,
    slideListEl : elements.sideDishEl.querySelector('.slide_list'),
    naviEl : elements.sideDishEl.querySelector('.slides_navi'),
})

const soupDishSlide = new MenuSlide({
    url : contentURL.soupDish,
    slideListEl : elements.soupDishEl.querySelector('.slide_list'),
    naviEl : elements.soupDishEl.querySelector('.slides_navi'),
})

const courseDishSlide = new MenuSlide({
    url : contentURL.courseDish,
    slideListEl : elements.courseDishEl.querySelector('.slide_list'),
    naviEl : elements.courseDishEl.querySelector('.slides_navi'),
})

function init() {
    elements.body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
}
init();