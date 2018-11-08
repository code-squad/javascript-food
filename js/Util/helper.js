export const qs = selector => document.querySelector(selector);
export const qsa = selector => document.querySelectorAll(selector);
export const $on = (targetNode, eventType, callback) => {
  targetNode.addEventListener(eventType, callback);
}

export const ajax = (url, handler, param1) => {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    const requestData = JSON.parse(xhr.response);
    handler(requestData, param1);
  });
  xhr.open("GET", url);
  xhr.send();
}

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function makeItemScoreByStars(star) {
  let result = "";
  let MAX_COUNT = 5;
  for (let i = MAX_COUNT; i > 0; i-- , star--) {
    result += star > 0 ? "<span>★</span>" : "<span>☆</span>";
  }
  return result;
}