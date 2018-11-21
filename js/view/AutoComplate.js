import { searchListTpl } from '../template/searchListTpl.js'
export default class AutoComplate{
    constructor({searchBarEl}){
        this.searchBarEl = searchBarEl;
    }

    inputEvent(){
        const inputEl = this.searchBarEl.querySelector('input');
        const searchList = this.searchBarEl.querySelector('.search-list');

        inputEl.addEventListener('input', () => {
    
        })
        inputEl.addEventListener('blur', ()=>{

        })
    }
}