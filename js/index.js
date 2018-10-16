import TabView from './TabView.js';
import Transition from './Transition.js'


const bestTabEl = document.querySelector('.best_seller_tab');
const bestSellerURL = 'http://crong.codesquad.kr:8080/woowa/best/';

const tabView = new TabView({
    tabElement: bestTabEl,
    url: bestSellerURL
});
const transition = new Transition();

function init() {
    const body = document.querySelector('body');
    body.addEventListener('click', (e) => {
        if (e.target.tagName !== 'A') return;
        e.preventDefault();
    })
    tabView.init();
    transition.init();
}

init();