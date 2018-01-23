import {
    on,
    qs,
    delegate
} from '../helpers';

export default class {
    constructor() {
        this.updownButton = qs('.page_up_down_list');
    }

    bind(bindCmd, handler) {
        const bindCommands = {
            click: () => {
                delegate(this.updownButton, '.page_up_down_list > li > a',
                    'click', e => handler(e.delegateTarget.dataset.direction));
            },
            hide: () => {
                on(window, 'scroll', () => {
                    this.updownButton.style.display = window.scrollY > 90 ? 'block' : 'none';
                });
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

}