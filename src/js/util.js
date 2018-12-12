export function throttle(func, timer) {
    let shutter;
    return function () {
        if (!shutter) {
            func.apply(null, arguments);
            shutter = setTimeout(() => shutter = null, timer);
        }
    }
}

export function debounce(func, timer) {
    let shutter;
    return function () {
        clearTimeout(shutter);
        shutter = setTimeout(() => { func.apply(null, arguments) }, timer);
    }
}

export function hideElement(element) {
    element.classList.remove('show');
    element.classList.add('hide');
}

export function showElement(element) {
    element.classList.remove('hide');
    element.classList.add('show');
}

export const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

export function removeExpirationItems() {
    Object.keys(localStorage).forEach(v => {
        const expieationTime = 1000 * 60 * 60; //6시간
        if (new Date().getTime() - JSON.parse(localStorage[v]).time > expieationTime) localStorage.removeItem(v);
    })
}

export function setLocalItem(key, value) {
    localStorage.setItem(key, JSON.stringify({
        value,
        time: new Date().getTime()
    }))
}

export function getLocalItem(key) {
    return localStorage.getItem(key) && JSON.parse(localStorage.getItem(key)).value
}

function request(url, requestType = "GET") {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            const res = JSON.parse(xhr.response)
            res.error || xhr.status !== 200 ? reject('error') : resolve(res);
        })
        xhr.open(requestType, url);
        xhr.send();
    })
}

export async function checkLocalItem(url) {
    try {
        if (localStorage.getItem(url)) return;
        const value = await request(url);
        setLocalItem(url, value);
    } catch (e) {
        return true;
    }
}