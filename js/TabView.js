export default class TabView{
    constructor({tabElement, template, ajax, url}){
        this.tabEl = tabElement;
        this.bestListEl = this.tabEl.nextElementSibling;
        this.template = template;
        this.ajax = ajax;
        this.url = url;
        this.init();
    }

    init(){
        const firstNode = this.tabEl.firstElementChild;
        this.focusTab(firstNode);
        this.ajax(this.getUrl(this.getCategoryNo(firstNode)), this.render.bind(this));
        this.clickTab();
    }
    
    clickTab(){
        this.tabEl.addEventListener('click', ({target})=>{
            this.focusTab(target);
            this.ajax({
                url : this.getUrl(this.getCategoryNo(target)),
                handler : this.render.bind(this),
                requestType : 'GET'
            });
        })
    }

    focusTab(target){
        this.blurTab();
        target.classList.add('now');
    }

    blurTab(){
        const childNodes = this.tabEl.querySelectorAll('li');
        childNodes.forEach( v=> v.classList.remove('now'));
    }

    getUrl(category_no){
        return this.url + category_no;
    }
    
    getCategoryNo(target){
        return target.getAttribute('data-category_no');
    }
    
    render(data){
        this.bestListEl.innerHTML = this.template(data);
    }
}