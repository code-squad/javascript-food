import Controller from './controller';
import {
    on
} from './helpers';
import CommonView from './commonView';
import InfiniteSlideView from './infiniteSlideView';
import AutomCompleteView from './autoCompleteView';

const urlList = {
    mainSlide: 'http://home.dotol.xyz/php/test_api.php',
    bestBanchan: 'http://crong.codesquad.kr:8080/woowa/best',
    side: 'http://crong.codesquad.kr:8080/woowa/side',
    main: 'http://crong.codesquad.kr:8080/woowa/main',
    course: 'http://crong.codesquad.kr:8080/woowa/soup'
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