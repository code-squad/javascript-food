import { searchListTpl } from '../template/searchListTpl.js'
import { debounce, showElement, hideElement } from '../util.js' 
export default class AutoComplate{
    constructor({searchBarEl, urlRequestData, debounceTimer=1000}){
        this.searchBarEl = searchBarEl;
        this.inputEvent(debounceTimer);
        this.urlRequestData = urlRequestData;
    }

    inputEvent(timer){
        const inputEl = this.searchBarEl.querySelector('input');
        const searchList = this.searchBarEl.querySelector('.search-list');

        inputEl.addEventListener('focus',()=>{showElement(searchList)})
        inputEl.addEventListener('blur', ()=>{hideElement(searchList)})
        inputEl.addEventListener('input', debounce(({target}) => {
            fetch(this.getRequestUrl(target.value), { mode : 'cors'})
            .then(reponse => reponse.text())
            .then(text=>{this.render(JSON.parse(text))})
            .catch(error=>{})
        },timer))
    }

    getRequestUrl(value){
        return this.urlRequestData + value;
    }
    
    render(data){
        const searchList = this.searchBarEl.querySelector('.search-list');
        searchList.innerHTML = searchListTpl(data);
    }
}