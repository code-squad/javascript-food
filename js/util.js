function ajax({ url, handler, requestType }) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

        const requestData = JSON.parse(xhr.response);
        handler(requestData);
    })
    xhr.open(requestType, url);
    xhr.send();
}


function fadeIn(el, time) {
    time = time / 1000;
    let opacity = 0;
    const fps = 1 / 60 / time;
    function increaseOpacity() {
        opacity += fps;
        el.style.opacity = opacity;
        if (opacity < 1) {
            requestAnimationFrame(increaseOpacity);
        }
    }
    requestAnimationFrame(increaseOpacity);
}

function fadeOut(el, time) {
    time = time / 1000;
    let opacity = 1;
    const fps = 1 / 60 / time;
    function decreaseOpacity() {
        if (opacity < 0) return true;
        opacity -= fps;
        el.style.opacity = opacity;
        requestAnimationFrame(decreaseOpacity);
    }
    requestAnimationFrame(decreaseOpacity);
}

export { ajax, fadeIn, fadeOut }