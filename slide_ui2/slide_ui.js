//utill 따로 뺄까
function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}
function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}
function makeTag(tag,length,key,value){ //emmet 처럼만들고싶다아악, 재귀적처리,매개변수없으면 빈태그생성 등
	var newTag = "";
	while(length--){
		var form = '<'+tag+' '+key+'="'+value+'"></'+tag+'> ';
		newTag += form;
	}
	return newTag;
}

//초기화 작업. 문서의 내부에 클래스명이 slide인것을 찾아서 이미지슬라이드 생성
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
    this.target = qs(cn); //매개변수로 클래스이름(cn)을 받고들어오기 때문에 초기화x
    this.slideList = null;
    this.moveButton = null;
    this.pagination = null;
        
    this.init = function(){
        this.length = this.urlList.length;
        this.last = this.length-1;
        this.target.innerHTML = this.template;

        //이미지li, 페이지버튼 만들어서 붙이기
        this.slideList = this.target.children[0]; //이미지 ul 
        this.moveButton = this.target.children[1];
        this.pagination = this.target.children[2].children[0]; //페이지버튼 ul
        
        //url에서 가져온 이미지갯수만큼 li생성
        this.urlList.forEach((url,index)=> {
            var li = document.createElement("li");
            li.style.background = 'url("'+url+'") no-repeat center';
            this.slideList.appendChild(li);
            index == 0 ? li.className = "show" : li.className = "hide";

            this.pagination.innerHTML += "<li><a></a></li> ";
        });
        this.pagination.children[0].className = "on";
        
        //prev next 이벤트 붙이기
        $on(this.moveButton,"click",e=>{
            if(!event.target || event.target.nodeName !== "A") {
                return;
            }
            e.target.className == "next" ? this.next() : this.prev();
        });

        //pagination 이벤트 붙이기
        $on(this.pagination,"click",e=>{
            if(!e.target || e.target.nodeName !== "A"){
                return;
            }
            var p = e.target.parentElement.parentElement; //ul>li>a -> index비교를 ul단에서 해야함 -> 상위2회접근
            var index = Array.prototype.indexOf.call(p.children, e.target.parentElement);
            
            this.hide(this.index);                
            this.show(index);
            this.index = index;
        });
    };

    (function(){ //new slide 시에 즉시 실행되버림, 사실상 .init() 할 필요 x
        this.target && slide.prototype.getData(this.target.innerHTML,this); //이미지 리스트를 배열로 저장
    }.bind(this))(); //bind를 하지않으면 window가 this
    //이후에 init 할것들은 그럼 어떻게 해야하나?
    //기존의 데이터를 받는 init은 그냥 즉시실행함수로 만들어버리고 init에 새로운 작업들 부여
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
            obj.init(); //단순히 url에서 데이터를 받아오는 함수인데 비동기처리를 위해서 여기 있어도 될까? 다른방법은없나 
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