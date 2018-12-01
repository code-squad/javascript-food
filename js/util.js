function ajax({ url, handler, requestType }) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

        const requestData = JSON.parse(xhr.response);
        handler(requestData);
    })
    xhr.open(requestType, url);
    xhr.send();
}

function throttle(func, timer) {
    let shutter;
    return function () {
        if (!shutter) {
            func.apply(null, arguments);
            shutter = setTimeout(() => shutter = null, timer);
        }
    }
}

function debounce(func, timer) {
    let shutter;
    return function () {
        clearTimeout(shutter);
        shutter = setTimeout(() => { func.apply(null, arguments) }, timer);
    }
}

function hideElement(element) {
    element.classList.remove('show');
    element.classList.add('hide');
}

function showElement(element) {
    element.classList.remove('hide');
    element.classList.add('show');
}

const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

function removeExpirationItems() {
    Object.keys(localStorage).forEach(v => {
        const expieationTime = 1000 * 60 * 60; //6시간
        if (new Date() - JSON.parse(localStorage[v]).time > expieationTime) localStorage.removeItem(v);
    })
}

function setLocalItem(key, value) {
    localStorage.setItem(key, JSON.stringify({
        value,
        time: new Date()
    }))
}

function request(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            xhr.status === 200 ? resolve(JSON.parse(xhr.response)) : reject('status error');
        })
        xhr.open("GET", url);
        xhr.send();
    })
}

async function checkLocalItem(url) {
    try {
        if (localStorage.getItem(url)) return;
        const value = await request(url);
        setLocalItem(url, value);
    } catch (e) {
        throw e;
    }
}

export { ajax, throttle, debounce, hideElement, showElement, pipe, removeExpirationItems, checkLocalItem }