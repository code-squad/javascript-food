import { searchListTpl } from '../template/searchListTpl.js'
import { debounce, showElement, hideElement } from '../util.js' 
export default class AutoComplate{
    constructor({searchBarEl, urlRequestData, debounceTimer=200}){
        this.searchBarEl = searchBarEl;
        this.urlRequestData = urlRequestData;

        this._el = { 
            searchbar : this.searchBarEl,
            input : this.searchBarEl.querySelector('input'),
            searchList : this.searchBarEl.querySelector('.search-list'),
            submit : this.searchBarEl.querySelector('button')
        };
        this.selectedEl = null;
        this.totalEvent(debounceTimer)
    }

    totalEvent(timer){
        
        const event = {
            input : ()=>{
                this._el.input.addEventListener('input',debounce(this.inputEventHandler.bind(this),timer))
            },
            focus : ()=>{
                this._el.input.addEventListener('focus',this.focusEventHandler.bind(this))
            },
            click : ()=>{
                this._el.searchList.addEventListener('click',this.clickSearchListHandler.bind(this))
            },
            clickAnotherArea : ()=>{
                document.body.addEventListener('click', this.clickAnotherAreaHanlder.bind(this))
            },
            keyup : ()=>{
                this._el.searchbar.addEventListener('keyup',this.keyupHandler.bind(this))
            },
            hover : ()=>{
                this._el.searchList.addEventListener('mouseover', this.mouseoverEventHandler.bind(this))
                this._el.searchList.addEventListener('mouseleave', this.mouseleaveEventHandler.bind(this))
            }
        }

        Object.keys(event).forEach( v=> event[v]())
    }
    
    focusEventHandler(){
        showElement(this._el.searchList)
    }

    clickAnotherAreaHanlder({target}){
        target.parentElement !== this._el.searchList && target !== this._el.input && hideElement(this._el.searchList);
    }

    clickSearchListHandler({target}){
        if(target.tagName !== "LI")return ;
        this.inputValue();
        hideElement(target.parentElement);
    }

    inputEventHandler({target}){
        showElement(this._el.searchList)
        fetch(this.getRequestUrl(target.value), { mode : 'cors'})
        .then(reponse => reponse.text())
        .then(text=>{this.render(JSON.parse(text))})
        .catch(error=>{})
    }

    mouseoverEventHandler({target}){
        if(target.tagName !== 'LI')return ;
        this.removeSelectedClassName();
        this.addSelectedClassName(target);
    }

    mouseleaveEventHandler(){
        this.removeSelectedClassName();
        this.resetSelectedElement();
    }

    keyupHandler({key}){
        if(key === "ArrowUp" || key === "ArrowDown")this.arrowkeyHandler(key)
        if(key === "Enter")this.enterkeyHandler()
    }

    arrowkeyHandler(key){
        let selectedEl
        key === "ArrowUp" ? 
        selectedEl = this.selectedEl ? this.selectedEl.previousSibling : this._el.searchList.lastChild
        : selectedEl = this.selectedEl ? this.selectedEl.nextSibling : this._el.searchList.firstChild
        this.removeSelectedClassName();
        this.addSelectedClassName(selectedEl);
    }

    enterkeyHandler(){
        this.inputValue();
        hideElement(this._el.searchList);
    }

    addSelectedClassName(target){
        this.selectedEl = target;
        this.selectedEl && this.selectedEl.classList.add('selected');
    }
    
    removeSelectedClassName(){
        this.selectedEl && this.selectedEl.classList.remove('selected');
    }

    inputValue(){
        this._el.input.value = this.selectedEl.innerText;
    }

    resetSelectedElement(){
        this.selectedEl = null;
    }

    getRequestUrl(value){
        return this.urlRequestData + value;
    }

    render(data){
        this._el.searchList.innerHTML = searchListTpl(data);
    }
}