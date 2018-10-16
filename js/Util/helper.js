export const qs = selector => document.querySelector(selector);
export const qsa = selector => document.querySelectorAll(selector);
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
