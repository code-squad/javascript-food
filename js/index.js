import {ajax} from './util.js';
import Template from './Template.js';
import TabView from './TabView.js';

const bestTabEl = document.querySelector('.best_seller_tab');
const template = new Template();

new TabView(bestTabEl, template.bestItemList.bind(template) ,ajax);