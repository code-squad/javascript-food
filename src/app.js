import Controller from './controller';
import {
    on
} from './helpers';
import View from './commonView';
import InfiniteSlideView from './infiniteSlideView';

const urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    sideBanchan: 'http://crong.codesquad.kr:8080/woowa/side',
    mainBanchan: 'http://crong.codesquad.kr:8080/woowa/main',
    courseBanchan: 'http://crong.codesquad.kr:8080/woowa/soup'
};

const commonView = new View();
const sideBanchanView = new InfiniteSlideView('side');
const mainBanchanView = new InfiniteSlideView('main');
const courseBanchanView = new InfiniteSlideView('course');


/**
 * @type {Controller}
 */
const controller = new Controller(urlList, commonView, sideBanchanView, mainBanchanView, courseBanchanView);

const setView = () => controller.setView();
on(window, 'load', setView);