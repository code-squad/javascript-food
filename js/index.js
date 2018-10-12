import {ajax} from './util.js';
import Template from './Template.js';
import TabView from './TabView.js';

const bestTabEl = document.querySelector('.best_seller_tab');
const bestSellerURL = 'http://crong.codesquad.kr:8080/woowa/best/';
const template = new Template();

new TabView({bestTabEl, template.bestItemList.bind(template) ,ajax, bestSellerURL});