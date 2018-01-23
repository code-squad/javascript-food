import View from './View.js';

export default class extends View {
    constructor(el) {
        super(el);
    }

    bind(bindCmd) {
        const bindCommands = {
            click: () => {
                this.delegate('.page_up_down_list > li > a',
                    'click', e => this.emit('@move', {
                        direction: e.delegateTarget.dataset.direction
                    }));
            },
            hide: () => {
                window.addEventListener('scroll',
                    () => window.scrollY > 90 ? this.show() : this.hide());
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

}