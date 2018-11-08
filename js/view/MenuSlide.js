import {ajax} from '../util.js';
import {itemListTpl} from '../template/itemListTpl.js';

export default class MenuSlide{

    constructor({url, slideListEl, naviEl, viewContentCount = 4, timer = 500}){

        this.slideListEl = slideListEl;
        this.naviEl = naviEl;
        this.viewContentCount = viewContentCount;
        this.timer = timer;

        ajax({
            'url' : url,
            'requestType' : 'GET',
            'handler' : this.init.bind(this)
        })
    }

    init(data){
        this.setContentData(data);
        this.setListWidth();

        const firstView = Array.from(this.contentData).slice(0,this.viewContentCount);
        const lastView = Array.from(this.contentData).slice(-this.viewContentCount);

        this.render(lastView);
        this.render(this.contentData);
        this.render(firstView);

    }
    
    setContentData(data){
        this.contentData = data;
    }

    render(data){
        this.slideListEl.innerHTML += itemListTpl(data);
    }

}