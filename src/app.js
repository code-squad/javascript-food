import Controller from './controller';
import {
    on
} from './helpers';
import CommonView from './view/commonView';
import InfiniteSlideView from './view/infiniteSlideView';
import AutomCompleteView from './view/autoCompleteView';

const urlList = {
    mainSlide: 'https://52.79.148.74/mainSlide',
    bestBanchan: 'https://52.79.148.74/best',
    side: 'https://52.79.148.74/side',
    main: 'https://52.79.148.74/main',
    course: 'https://52.79.148.74/soup'
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