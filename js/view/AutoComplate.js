import { searchListTpl } from '../template/searchListTpl.js'
import { showElement, hideElement } from '../util.js' 
export default class AutoComplate{
    constructor({searchBarEl}){
        this.searchBarEl = searchBarEl;
        this.inputEvent();
    }

    inputEvent(){
        const inputEl = this.searchBarEl.querySelector('input');
        const searchList = this.searchBarEl.querySelector('.search-list');

        inputEl.addEventListener('input', () => {
            showElement(searchList);
        })
        inputEl.addEventListener('blur', ()=>{
            hideElement(searchList);
        })
    }
}