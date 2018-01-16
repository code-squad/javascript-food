import Controller from './controller';
import {
    on
} from './helpers';
import CommonView from './view/commonView';
import InfiniteSlideView from './view/infiniteSlideView';
import AutomCompleteView from './view/autoCompleteView';

const urlList = {
    mainSlide: 'http://52.79.148.74:3000/mainSlide',
    bestBanchan: 'http://52.79.148.74:3000/best',
    side: 'http://52.79.148.74:3000/side',
    main: 'http://52.79.148.74:3000/main',
    course: 'http://52.79.148.74:3000/soup'
};

const commonView = new CommonView();
const sideBanchanView = new InfiniteSlideView('side');
const mainBanchanView = new InfiniteSlideView('main');
const courseBanchanView = new InfiniteSlideView('course');
const automCompleteView = new AutomCompleteView();


/**
 * @type {Controller}
 */
const controller = new Controller(urlList, commonView, automCompleteView, sideBanchanView, mainBanchanView, courseBanchanView);

const setView = () => controller.setView();
on(window, 'load', setView);