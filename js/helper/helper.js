export const qs = (selector, scope = document) => scope.querySelector(selector);

export const $on = (target, type, callback, capture = false) => target.addEventListener(type, callback, !!capture);

export const renderer = ({selector, template, data})=> qs(selector).innerHTML = template(data)