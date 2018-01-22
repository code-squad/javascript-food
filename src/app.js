import Controller from './controller';
import {
    on
} from './helpers';
import MainSlideView from './view/MainSlideView';
import BestBanchanView from './view/BestBanchanView';
import ScrollerView from './view/ScrollerView';
import InfiniteSlideView from './view/InfiniteSlideView';
import AutomCompleteView from './view/AutoCompleteView';

const urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    side: 'http://crong.codesquad.kr:8080/woowa/side',
    main: 'http://crong.codesquad.kr:8080/woowa/main',
    course: 'http://crong.codesquad.kr:8080/woowa/soup'
};

const mainSlideView = new MainSlideView();
const bestBanchanView = new BestBanchanView();
const scrollerView = new ScrollerView();
const sideBanchanView = new InfiniteSlideView('side');
const mainBanchanView = new InfiniteSlideView('main');
const courseBanchanView = new InfiniteSlideView('course');
const automCompleteView = new AutomCompleteView();


/**
 * @type {Controller}
 */
const controller = new Controller(urlList, mainSlideView, bestBanchanView, scrollerView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

const setView = () => controller.setView();
on(window, 'load', setView);