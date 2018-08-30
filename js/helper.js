const _throttle = function({delay, callback}) {
  let standardTime = 0;
  return () => {
    const now = new Date().getTime();

    if((now - standardTime) <= delay) return;

    standardTime = now;
    callback();
  }
}

const _ajax = function({responseDataHandler, url, callback}) {
  const x = new XMLHttpRequest();
  x.addEventListener('load', () => {
    const responseData = responseDataHandler(x.response);
    callback(responseData);
  });
  x.open('GET', url);
  x.send();
}

export const currying = function({fn, keys}) {
  return function inner(obj) {
    if(keys.every(key => obj[key] !== undefined)) return fn(obj);
    return (restObj) => inner(Object.assign(obj, restObj));
  }
}

export const ajax = currying({fn: _ajax, keys: ['responseDataHandler', 'url', 'callback']})
export const throttle = currying({fn: _throttle, keys: ['delay', 'callback']})