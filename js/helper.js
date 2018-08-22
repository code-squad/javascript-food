export const throttle = function({delay, callback}) {
  let standardTime = 0;
  return function() {
    const now = new Date().getTime();

    if((now - standardTime) <= delay) return;

    standardTime = now;
    callback();
  }
}

export const ajax = function({uri, callback}) {
  const x = new XMLHttpRequest();
  x.addEventListener('load', () => {
    callback(JSON.parse(x.response));
  });
  x.open('GET', uri);
  x.send();
}