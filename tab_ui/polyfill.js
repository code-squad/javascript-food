//Array.from
if(window.Array && !Array.from){
    Array.from = function (arrayLike){
        var i,result=[];
        var length = arrayLike.length;

        for(i=0;i<length;i++){
            result.push(arrayLike[i]);
        }    
    
        return result;
    }
}