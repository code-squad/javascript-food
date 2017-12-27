function qs(selector, scope) {
	return (scope || document).querySelector(selector);
}
function qsa(selector, scope) {
	return (scope || document).querySelectorAll(selector);
}
function $on(target, type, callback, capture) {
	target.addEventListener(type, callback, !!capture);
}