import Controller from './controller';
import {
    on
} from './helpers';
import View from './view';
import InfiniteView from './infiniteView';

const view = new View();
const infiniteView = new InfiniteView();

const urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    sideBanchan: 'http://crong.codesquad.kr:8080/woowa/side',
    mainBanchan: 'http://crong.codesquad.kr:8080/woowa/main',
    courseBanchan: 'http://crong.codesquad.kr:8080/woowa/soup'
};

/**
 * @type {Controller}
 */
const controller = new Controller(urlList, view, infiniteView);

const setView = () => controller.setView();
on(window, 'load', setView);