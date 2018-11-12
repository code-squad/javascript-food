import {ajax} from '../util.js';
import {itemListTpl} from '../template/itemListTpl.js';

export default class MenuSlide{

    constructor({urlRequestData, slideListEl, naviEl, viewContentCount = 4, timer = 500}){

        this.slideListEl = slideListEl;
        this.naviEl = naviEl;
        this.viewContentCount = viewContentCount;
        this.timer = timer;

        ajax({
            'url' : urlRequestData,
            'requestType' : 'GET',
            'handler' : this.init.bind(this)
        })
    }

    init(data){
        this.setContentData(data);
        this.setListWidth();

        const firstView = Array.from(this.contentData).slice(0,this.viewContentCount);
        const lastView = Array.from(this.contentData).slice(-this.viewContentCount);
        const initRenderData = lastView.concat(this.contentData).concat(firstView);
        
        this.render(initRenderData);

        this.currentPositionX = this.positionValue().firstContentPositionX;
        this.slideListEl.style.transform = `translateX(${this.currentPositionX}%`;

        this.clickNextBtn(this.positionValue());
        this.clickPreBtn(this.positionValue());
    }
    
    clickNextBtn({firstContentPositionX, minPositionX}){

        const nextBtn = this.naviEl.children[1];
        nextBtn.addEventListener('click', ()=>{
            this.slideContent(this.minusPositionX.bind(this), this.positionValue());
            if(this.currentPositionX === minPositionX)this.resetToInitContent(firstContentPositionX,this.timer);
        })
    }

    clickPreBtn({lastContentPositionX, maxPositionX}){

        const preBtn = this.naviEl.children[0];
        preBtn.addEventListener('click', ()=>{
            this.slideContent(this.plusPositionX.bind(this), this.positionValue());
            if(this.currentPositionX === maxPositionX)this.resetToInitContent(lastContentPositionX,this.timer);
        })
    }

    slideContent(convertPositionValue,positionValue){
        if(!this.slideListEl.style.transition)this.slideListEl.style.transition = `transform ${this.timer/1000}s`;

        convertPositionValue(positionValue);
        this.slideListEl.style.transform = `translateX(${this.currentPositionX}%)`;
    }

    resetToInitContent(initPositionX, timer){
        setTimeout(()=>{
            this.slideListEl.style.transition = "";
            this.currentPositionX = initPositionX;
            this.slideListEl.style.transform = `translateX(${this.currentPositionX}%)`;
        },timer);
    }
    
    plusPositionX({maxPositionX}){
        const contentWidth = 10;
        this.currentPositionX += contentWidth;
        if(this.currentPositionX > maxPositionX)this.currentPositionX = maxPositionX;
    }

    minusPositionX({minPositionX}){
        const contentWidth = 10;
        this.currentPositionX -= contentWidth;
        if(this.currentPositionX < minPositionX)this.currentPositionX = minPositionX;
    }

    setListWidth(){
        this.slideListEl.style.width = 1000 + "%";
    }

    setContentData(data){
        this.contentData = data;
    }

    render(data){
        this.slideListEl.innerHTML += itemListTpl(data);
    }

    positionValue(){
        const contentWidth = 10;
        const contentLength = this.contentData.length;
        const viewContentCount = this.viewContentCount;
        const remainContentCount = contentLength % viewContentCount;
        const remainContentsWidth = !remainContentCount ? contentWidth : contentWidth / viewContentCount * remainContentCount;

        const firstContentPositionX = -contentWidth;
        const maxPositionX = firstContentPositionX + remainContentsWidth;
        const minPositionX = -(contentWidth / viewContentCount * (contentLength + viewContentCount));
        const lastContentPositionX = minPositionX + remainContentsWidth;

        return { firstContentPositionX, lastContentPositionX, minPositionX, maxPositionX }
    }
}