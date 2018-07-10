export const qs = (selector, scope = document) => scope.querySelector(selector);

export const $on = (target, type, callback, capture) => target.addEventListener(type, callback, !!capture);
