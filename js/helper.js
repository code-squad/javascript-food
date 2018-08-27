export const throttle = function({delay, callback}) {
  let standardTime = 0;
  return () => {
    const now = new Date().getTime();

    if((now - standardTime) <= delay) return;

    standardTime = now;
    callback();
  }
}

export const ajax = function({responseDataHandler}) {
  return ({uri, callback}) => {
    const x = new XMLHttpRequest();
    x.addEventListener('load', () => {
      const responseData = responseDataHandler(x.response);
      callback(responseData);
    });
    x.open('GET', uri);
    x.send();
  }
}