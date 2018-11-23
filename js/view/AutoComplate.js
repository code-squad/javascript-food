import { searchListTpl } from '../template/searchListTpl.js'
import { debounce, showElement, hideElement } from '../util.js' 
export default class AutoComplate{
    constructor({searchBarEl, urlRequestData, debounceTimer=1000}){
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
                
            },
            clickAnotherArea : ()=>{
                document.body.addEventListener('click', this.clickAnotherAreaHanlder.bind(this))
            },
            keyup : ()=>{
                this._e.searchbar.addEventListener('keyup',(e)=>{
                    if(e.key === "ArrowUp")this.keyupArrowUpHandler()
                    if(e.key === "ArrowDown")this.keyupArrowDownHandler()
                    if(e.key === "Enter")this.keyupEnterHandler()
                })
            },
            hover : ()=>{
                
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

    inputEventHandler({target}){

        showElement(this._el.searchList)
        fetch(this.getRequestUrl(target.value), { mode : 'cors'})
        .then(reponse => reponse.text())
        .then(text=>{this.render(JSON.parse(text))})
        .catch(error=>{})
    }

    mouseoverEventHandler(){
        
    }

    mouseleaveEventHandler(){
        
    }

    keyupArrowUpHandler(){
        
    }

    keyupArrowDownHandler(){
        
    }

    keyupEnterHandler(){
        
    }

    addSelectedClassName(){
        
    }

    removeSelectedClassName(){
        
    }

    getSelectedElement(){
        
    }

    getRequestUrl(value){
        return this.urlRequestData + value;
    }

    render(data){
        this._el.searchList.innerHTML = searchListTpl(data);
    }
}