import {
    delegate
} from '../helpers';

export default class {

    bind(bindCmd, handler) {
        const bindCommands = {
            click: () => {
                delegate('.page_up_down_list', '.page_up_down_list > li > a',
                    'click', e => handler(e.delegateTarget.dataset.direction));
            }
        };

        bindCommands[bindCmd]();
    }

}