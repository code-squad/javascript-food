import './css/style.scss';
import Controller from './controller';
import MainSlideView from './view/MainSlideView';
import BestBanchanView from './view/BestBanchanView';
import ScrollerView from './view/ScrollerView';
import InfiniteSlideView from './view/InfiniteSlideView';
import AutomCompleteView from './view/AutoCompleteView';

const urlList = {
    mainSlide: 'https://cdn.rawgit.com/sphilee/javascript-food/master/public/mainSlide.json',
    bestBanchan: 'https://cdn.rawgit.com/sphilee/javascript-food/master/public/best.json',
    side_food: 'https://cdn.rawgit.com/sphilee/javascript-food/master/public/side.json',
    main_food: 'https://cdn.rawgit.com/sphilee/javascript-food/master/public/main.json',
    course_food: 'https://cdn.rawgit.com/sphilee/javascript-food/master/public/soup.json',
    autoComplete: 'https://ko.wikipedia.org/w/api.php?action=opensearch&search='
};

const mainSlideView = new MainSlideView('.main_slide');
const bestBanchanView = new BestBanchanView('.best_food');
const scrollerView = new ScrollerView('.scroller');
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