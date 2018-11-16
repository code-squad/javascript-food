export default class ScrollBtnView{
    constructor({scrollEl, debounceTimer = 200}){
        this.scrollEl = scrollEl;
        this.clickScrollBtn();
        this.viewScrollBtn(debounceTimer);
    }
    
    clickScrollBtn(){ 
        this.scrollEl.addEventListener('click', ({target})=>{
            this.pageScroll(target.className);
        })
    }

    viewScrollBtn(timer){
        let shutter;
        window.addEventListener('scroll', ()=>{

            clearTimeout(shutter);
            this.hideElement(this.scrollEl);

            shutter = setTimeout(()=>{this.showElement(this.scrollEl)},timer);
        })
    }

    hideElement(element){
        element.classList.remove('show');
        element.classList.add('hide');
    }

    showElement(element){
        element.classList.remove('hide');
        element.classList.add('show');
    }

    pageScroll(className){
        const pageY = scrollY;
        const pageHeight = document.body.scrollHeight;
        let fps = 1;

        if( className === "page-up")pageUp();
        if( className === "page-down")pageDown();

        function pageUp(){
            fps = fps * 1.5;
            scrollTo(0, pageY - fps);
            if(pageY > fps)requestAnimationFrame(pageUp);
        }
        function pageDown(){
            fps = fps * 1.5;
            scrollTo(0, pageY + fps);
            if(pageY + fps < pageHeight)requestAnimationFrame(pageDown);
        }
    }
}