import Controller from './controller';
import MainSlideView from './view/MainSlideView';
import BestBanchanView from './view/BestBanchanView';
import ScrollerView from './view/ScrollerView';
import InfiniteSlideView from './view/InfiniteSlideView';
import AutomCompleteView from './view/AutoCompleteView';

const urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    side_food: 'http://crong.codesquad.kr:8080/woowa/side',
    main_food: 'http://crong.codesquad.kr:8080/woowa/main',
    course_food: 'http://crong.codesquad.kr:8080/woowa/soup',
    autoComplete: 'https://ko.wikipedia.org/w/api.php?action=opensearch&search='
};

const mainSlideView = new MainSlideView('.slides_container');
const bestBanchanView = new BestBanchanView('.best_food');
const scrollerView = new ScrollerView('.page_up_down_list');
const sideBanchanView = new InfiniteSlideView('.side_food');
const mainBanchanView = new InfiniteSlideView('.main_food');
const courseBanchanView = new InfiniteSlideView('.course_food');
const automCompleteView = new AutomCompleteView('.searchbar');


/**
 * @type {Controller}
 */
const controller = new Controller(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

const setView = () => controller.setView();
window.addEventListener('load', setView);