var data;   

function ajax() {
    var oReq = new XMLHttpRequest();
   
    oReq.addEventListener("load", function() {
    data = JSON.parse(this.responseText);

    makeLiList();
    makeTab();
    initBestTab();
    });
   
    oReq.open("GET", "http://crong.codesquad.kr:8080/woowa/best");
    oReq.send();
}

function makeLiList() { 
    var bestTabs = document.querySelector(".best_tabs");
    data.forEach(function(key,index){
        var li = '<li id="'+key.category_id+'">'+key.name+"</li>";
        bestTabs.innerHTML += li;
    });
}

function makeTab(){
    var container = document.querySelector(".best_container");
    var template = document.querySelector("#bestDetail").innerText;
    var findKeys = ["detail_hash","image","title","description","n_price","s_price"];
    data.forEach(function(key,index){
        var bestDetailUl = document.createElement("Ul");
        bestDetailUl.className = key.category_id;
        
        key.items.forEach(function(value){ 
            var bestDetailLi = template;
            var badgeTag = "";

            findKeys.forEach(key => { bestDetailLi = bestDetailLi.replace(`{{${key}}}`, value[key]);});
            bestDetailLi = bestDetailLi.replace("undefined","")
            .replace("{{delivery_type0}}",value.delivery_type[0])
            .replace("{{delivery_type1}}",value.delivery_type[1]);

            if("badge" in value){
                value.badge.forEach(value => badgeTag += "<div><span>"+value+"</span></div>");
                bestDetailLi = bestDetailLi.replace("{{badge}}",badgeTag);
            }
            else {
                bestDetailLi = bestDetailLi.replace("{{badge}}","");
            }

            bestDetailUl.innerHTML += bestDetailLi;
        });
        container.appendChild(bestDetailUl);
    });
}

function clickBestTab(e){
    Array.prototype.forEach.call(e.target.parentNode.children,function(value){
        value.className = "";
    });
    e.target.className = "clicked";

    var ul = Array.from(document.querySelector(".best_container").children);
    ul.forEach(function(value){
        if(value.className == e.target.id){
            value.style.display = "block";
        }
        else value.style.display = "none";
    });
}
function initBestTab(){
    var best_container = document.querySelector(".best_container").children;
    Array.from(best_container).forEach(function(value,index){
        index !== 0 ? value.style.display = "none" : value.style.display = "block";
    });
    
    document.querySelector(".best_tabs").addEventListener("click",function(event){
        if(!event.target || event.target.nodeName !== "LI") {
            return;
        }
        clickBestTab(event);
    });
}

window.addEventListener("DOMContentLoaded", ajax);