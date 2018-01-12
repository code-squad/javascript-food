import {
    qs,
    on
} from './helpers';
export default class View {
    constructor() {
        this.searchEl = qs('#search_str');
        this.suggestionsEl = qs('.autocomplete_suggestions');

    }

    bind(bindCmd, handler) {
        const bindCommands = {
            search: () => {
                on(this.searchEl, 'keyup', e => handler(e.target.value, e.keyCode));
            }
        };

        bindCommands[bindCmd]();
    }

    render(viewCmd, ...parameter) {
        const viewCommands = {
            autoComplete: () => {
                this.renderAutoComplete(...parameter);
            }
        };

        viewCommands[viewCmd]();
    }

    renderAutoComplete(term, suggestions) {
        this.emptyAutoComplete();
        const target = new RegExp(term, 'g');
        const suggestionsStr = suggestions.map(suggestion =>
            `<li class="autocomplete_suggestion" data-value="${suggestion}">${suggestion.replace(target, `<b>${term}</b>`)}</li>`).join('');
        this.suggestionsEl.insertAdjacentHTML('afterbegin', suggestionsStr);
    }

    enterAutoComplete() {
        if (this.sel && this.suggestionsEl.innerHTML) {
            this.searchEl.value = this.sel.dataset.value;
            this.emptyAutoComplete();
        }
    }

    moveAutoComplete(key) {
        this.sel = qs('.autocomplete_suggestion.selected');
        let target;
        if (this.sel) {
            target = key === 40 ? this.sel.nextSibling : this.sel.previousSibling;
            this.sel.classList.remove('selected');
        } else {
            target = key === 40 ? this.suggestionsEl.firstChild : this.suggestionsEl.lastChild;
        }
        target.classList.add('selected');
        this.sel = target;
    }

    emptyAutoComplete() {
        this.suggestionsEl.innerHTML = '';
    }

}