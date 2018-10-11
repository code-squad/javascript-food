export default class TabView{
    constructor(tabElement, template, ajax){
        this.tabEl = tabElement;
        this.bestListEl = this.tabEl.nextElementSibling;
        this.template = template;
        this.ajax = ajax;
        this.clickTab();
        this.init();
    }

    init(){
        const initEl = this.tabEl.firstElementChild;
        this.focusTab(initEl);
        this.ajax(this.getUrl(this.getCategoryNo(initEl)), this.render.bind(this));
    }
    
    clickTab(){
        this.tabEl.addEventListener('click', ({target})=>{
            this.focusTab(target);
            this.ajax(this.getUrl(this.getCategoryNo(target)), this.render.bind(this));
        })
    }

    focusTab(target){
        this.blurTab();
        target.classList.add('now');
    }

    blurTab(){
        const childNodes = this.tabEl.querySelectorAll('li');
        childNodes.forEach( v=> {v.classList.remove('now')});
    }

    getUrl(category_no){
        return 'http://crong.codesquad.kr:8080/woowa/best/' + category_no;
    }
    
    getCategoryNo(target){
        return target.getAttribute('data-category_no');
    }
    
    render(data){
        this.bestListEl.innerHTML = this.template(data);
    }
}