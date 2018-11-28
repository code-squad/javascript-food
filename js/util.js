function ajax({ url, handler, requestType }) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

        const requestData = JSON.parse(xhr.response);
        handler(requestData);
    })
    xhr.open(requestType, url);
    xhr.send();
}

function throttle(func, timer){
  let shutter;
  return function () {
    if (!shutter) {
      func.apply(null, arguments);
      shutter = setTimeout(() => shutter = null, timer);
    }
  }
}

function debounce(func, timer){
  let shutter;
  return function (){
    clearTimeout(shutter);
    shutter = setTimeout(()=>{ func.apply(null, arguments) }, timer);
  }
}

function hideElement(element){
  element.classList.remove('show');
  element.classList.add('hide');
}

function showElement(element){
  element.classList.remove('hide');
  element.classList.add('show');
}

export { ajax, throttle, debounce, hideElement, showElement }