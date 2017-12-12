
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
    var ul = document.querySelector(".best_tabs");
    data.forEach(function(key,index){
        var li = '<li id="'+key.category_id+'">'+key.name+"</li>";
        ul.innerHTML += li;
    });
}

function makeTab(){
    var container = document.querySelector(".best_container");
    var template = document.querySelector("#bestDetail").innerText;
    data.forEach(function(key,index){
        var ul = document.createElement("ul");
        ul.className = key.category_id;
        
        key.items.forEach(function(value){ 
            var li = template;
            var keys = ["detail_hash","image","title","description","n_price","s_price"];

            keys.forEach(key => { li = li.replace(`{{${key}}}`, value[key]);});
            li = li.replace("undefined","")
            .replace("{{delivery_type0}}",value.delivery_type[0])
            .replace("{{delivery_type1}}",value.delivery_type[1]);

            ul.innerHTML += li;

        });
        container.appendChild(ul);
    });
}


function initBestTab(){
    var ul = document.querySelector(".best_container").children;
    var i,length = ul.length;
    
    for(i=1;i<length;i++){
        ul[i].style.display = "none";
    }
    
    document.querySelector(".best_tabs").addEventListener("click",function(e){
        if(e.target && e.target.nodeName == "LI"){
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
    });
}

window.addEventListener("DOMContentLoaded", ajax);