export default class Scroll{
    constructor({scrollEl}){
        this.scrollEl = scrollEl;
        this.clickScrollBtn();
    }
    
    clickScrollBtn(){ 
        this.scrollEl.addEventListener('click', ({target})=>{
            this.pageScroll(target.className);
        })
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