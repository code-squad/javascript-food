function initSlide() { 
    var findSlide = qsa(".slide");
    var slideList = [];
    findSlide && findSlide.forEach(element => {
        slideList.push(new slide("."+element.classList[1]))
    });
}

function slide(cn){
    this.index = 0;
    this.last = null;
    this.length = null;
    this.urlList = null;
    this.target = qs(cn);
    this.slideList = null;
    this.moveButton = null;
    this.pagination = null;
        
    this.init = function(){
        this.length = this.urlList.length;
        this.last = this.length-1;
        this.target.innerHTML = this.template;

        this.slideList = this.target.children[0]; 
        this.moveButton = this.target.children[1];
        this.pagination = this.target.children[2].children[0];
        
        this.urlList.forEach((url,index)=> {
            var li = document.createElement("li");
            li.style.background = 'url("'+url+'") no-repeat center';
            this.slideList.appendChild(li);
            index == 0 ? li.className = "show" : li.className = "hide";

            this.pagination.innerHTML += "<li><a></a></li> ";
        });
        this.pagination.children[0].className = "on";
        
        $on(this.moveButton,"click",e=>{
            if(!event.target || event.target.nodeName !== "A") {
                return;
            }
            e.target.className == "next" ? this.next() : this.prev();
        });

        $on(this.pagination,"click",e=>{
            if(!e.target || e.target.nodeName !== "A"){
                return;
            }
            var p = e.target.parentElement.parentElement;
            var index = Array.prototype.indexOf.call(p.children, e.target.parentElement);
            
            this.hide(this.index);                
            this.show(index);
            this.index = index;
        });
    };

    (function(){ 
        this.target && slide.prototype.getData(this.target.innerHTML,this);
    }.bind(this))();
}
slide.prototype = {
    constructor : slide,
    template :  `
    <ul></ul>
    <div>
        <a class="prev"></a>
        <a class="next"></a>
    </div>
    <div class="slide_pagination">
        <ul></ul>
    </div>`,
    getData : function(url,obj){
        var data;
        var oReq = new XMLHttpRequest();
    
        oReq.addEventListener("load",function(){
            obj.urlList = JSON.parse(this.responseText);
            obj.init();
        });
        oReq.open("GET",url);
        oReq.send();
    },
    show : function(index){
        this.slideList.children[index].className = "show";
        this.pagination.children[index].className = "on";
    },
    hide : function(index){
        this.slideList.children[index].className = "hide";
        this.pagination.children[index].className = "off";
    },
    next : function(){
        this.hide(this.index);
        this.index == this.last ? this.index = 0 : this.index++;
        this.show(this.index);
    },
    prev : function(){
        this.hide(this.index);
        this.index == 0 ? this.index = this.last : this.index--;
        this.show(this.index);
    },
    change : function(index){
        this.hide(this.index);
        this.show(index);
    }
}

window.addEventListener("DOMContentLoaded", initSlide);