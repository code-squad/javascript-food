import Controller from './controller';
import {$on} from './helpers';
import View from './view';

const view = new View();
const controller = new Controller(view);

const setView = () => controller.setView();
$on(window, 'load', setView);