(function(win, doc) {
  var addFunction = function(type, funcName, func) {
    if (type && !type.prototype[funcName]) {
      type.prototype[funcName] = func;
    }
  };
  
  var forEach = function(callback, that) {
    that = that || win;

    for (var i = 0, len = this.length; i < len; i++) {
      var item = this[i];
      callback.call(that, item, i, this);
    }
  };

  addFunction(win.Array, 'from', function(arrayLike) {
    var arrayObj = [];

    for (var i = 0, len = arrayLike.length; i < len; i++) {
      arrayObj.push(arrayLike[i]);
    }

    return arrayObj;
  });

  addFunction(win.NodeList, 'forEach', forEach);
  addFunction(win.HTMLCollection, 'forEach', forEach);
})(window, document);
