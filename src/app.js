import Controller from './controller';
import {on} from './helpers';
import View from './view';
import InfiniteView from './infiniteView';

const view = new View();
const infiniteView = new InfiniteView();
const controller = new Controller(view, infiniteView);

const setView = () => controller.setView();
on(window, 'load', setView);