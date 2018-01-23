import autocompleteTemplate from '../template/autocomplete-tpl.html';
import {
    qs,
    on,
    delegate
} from '../helpers';
export default class {
    constructor() {
        this.searchEl = qs('#search_str');
        this.suggestionsEl = qs('.autocomplete_suggestions');
        this.searchButtonEl = qs('.search_btn');
    }

    bind(bindCmd, handler) {
        const bindCommands = {
            press: () => {
                on(this.searchEl, 'keyup', e => handler(e.target.value, e.keyCode, this.sel));
            },
            submit: () => {
                on(this.searchButtonEl, 'click', () => handler(this.searchEl.value));
            },
            history: () => {
                on(this.searchEl, 'click', () => handler(!this.suggestionsEl.innerHTML && !this.searchEl.value));
            },
            click: () => {
                delegate(this.suggestionsEl, '.autocomplete_suggestion', 'click', e => {
                    this.updateAutoComplete(e.delegateTarget);
                    this.enterAutoComplete();
                });
            },
            nonClick: () => {
                delegate('body', '*', 'click', e => e.target !== this.searchEl && this.emptyAutoComplete());
            },
            hover: () => {
                delegate(this.suggestionsEl, '.autocomplete_suggestion', 'mouseover', e => this.updateAutoComplete(e.delegateTarget));
            }
        };

        bindCommands[bindCmd]();
        return this;
    }

    render(viewCmd, ...params) {
        const viewCommands = {
            autoComplete: () => {
                this.renderAutoComplete(...params);
            },
            history: () => {
                this.renderSearches(...params);
            }
        };

        viewCommands[viewCmd]();
        return this;
    }

    renderAutoComplete(term, suggestions) {
        this.emptyAutoComplete();
        const target = new RegExp(term, 'ig');
        const suggestionsComponent = suggestions.map(suggestion =>
            autocompleteTemplate({
                keyword: suggestion,
                renderKeyword: suggestion.replace(target, `<b>${term}</b>`)
            })).join('');
        this.suggestionsEl.insertAdjacentHTML('afterbegin', suggestionsComponent);
    }

    renderSearches(searches) {
        const historyComponent = searches.map(search =>
            autocompleteTemplate({
                class: 'searches',
                keyword: search,
                renderKeyword: search
            })).join('');
        this.suggestionsEl.insertAdjacentHTML('afterbegin', historyComponent);
    }

    enterAutoComplete() {
        if (this.sel && this.suggestionsEl.innerHTML) {
            this.searchEl.value = this.sel.dataset.value;
            this.sel = null;
            this.emptyAutoComplete();
        }
    }

    moveAutoComplete(key) {
        this.sel = qs('.autocomplete_suggestion.selected');
        const [nextEl, prevEl] = this.sel ? [this.sel.nextSibling, this.sel.previousSibling] : [this.suggestionsEl.firstChild, this.suggestionsEl.lastChild];
        const target = key === 40 ? nextEl : prevEl;
        this.updateAutoComplete(target);
    }

    updateAutoComplete(target) {
        this.sel && this.sel.classList.remove('selected');
        this.sel = target;
        this.sel.classList.add('selected');
    }

    emptyAutoComplete() {
        this.suggestionsEl.innerHTML = '';
        return this;
    }

    emptySearchbar() {
        this.searchEl.value = '';
        return this;
    }

}