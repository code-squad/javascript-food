function ajax(url, handler){
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', ()=>{
        
        const requestData = JSON.parse(xhr.response);
        handler(requestData);
    })
    xhr.open('GET', url);
    xhr.send();
}

export {ajax}