(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define('Clus', factory) :
  (factory());
}(this, function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  //
  // utils.js
  //

  function find(selector) {
      return document.querySelectorAll(selector);
  }

  function trim(text) {
      var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
      return text == null ? '' : ('' + text).replace(rtrim, '');
  }

  function type(object) {
      var class2type = {},
          type = class2type.toString.call(object),
          typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

      if (object == null) {
          return object + '';
      }

      typeString.split(' ').forEach(function (type) {
          class2type['[object ' + type + ']'] = type.toLowerCase();
      });

      return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' || typeof object === 'function' ? class2type[type] || 'object' : typeof object === 'undefined' ? 'undefined' : _typeof(object);
  }

  function isPlainObject(object) {
      var proto = void 0,
          ctor = void 0,
          class2type = {},
          toString = class2type.toString,
          // Object.prototype.toString
      hasOwn = class2type.hasOwnProperty,
          fnToString = hasOwn.toString,
          // Object.toString/Function.toString
      ObjectFunctionString = fnToString.call(Object); // 'function Object() { [native code] }'

      if (!object || toString.call(object) !== '[object Object]') {
          return false;
      }

      // According to the object created by `Object.create(null)` is no `prototype`
      proto = Object.getPrototypeOf(object);
      if (!proto) {
          return true;
      }

      ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
      return typeof ctor === 'function' && fnToString.call(ctor) === ObjectFunctionString;
  }

  function merge(first, second) {
      var length = +second.length,
          j = 0,
          i = first.length;

      for (; j < length; j++) {
          first[i++] = second[j];
      }

      first.length = i;

      return first;
  }

  function extend() {
      var options = void 0,
          name = void 0,
          clone = void 0,
          copy = void 0,
          source = void 0,
          copyIsArray = void 0,
          target = arguments[0] || {},
          i = 1,
          length = arguments.length,
          deep = false;

      if (typeof target === 'boolean') {
          deep = target;
          target = arguments[i] || {};
          i++;
      }

      if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && type(target) !== 'function') {
          target = {};
      }

      if (i === length) {
          target = this;
          i--;
      }

      for (; i < length; i++) {
          //
          if ((options = arguments[i]) !== null) {
              // for in source object
              for (name in options) {

                  source = target[name];
                  copy = options[name];

                  if (target == copy) {
                      continue;
                  }

                  // deep clone
                  if (deep && copy && (isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                      // if copy is array
                      if (copyIsArray) {
                          copyIsArray = false;
                          // if is not array, set it to array
                          clone = source && Array.isArray(source) ? source : [];
                      } else {
                          // if copy is not a object, set it to object
                          clone = source && isPlainObject(source) ? source : {};
                      }

                      target[name] = extend(deep, clone, copy);
                  } else if (copy !== undefined) {
                      target[name] = copy;
                  }
              }
          }
      }

      return target;
  }

  function pushStack(els) {
      var ret = merge(this.contructor(), els);
      ret.prevObject = this;
      return ret;
  }

  function find$1(selector) {
      var i = 0,
          len = this.length,
          self = this,
          ret = this.pushStack([]);

      for (; i < len; i++) {
          Clus.find(selector, self[i], ret);
      }

      return ret;
  }

  function end() {
      return this.prevObject || this.constructor();
  }

  function eq(i) {
      var len = this.length,
          j = +i + (i < 0 ? len : 0); // reverse find
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  }

  function first() {
      return this.eq(0);
  }

  function last() {
      return this.eq(-1);
  }

  var search = {
      pushStack: pushStack,
      find: find$1,
      end: end,
      eq: eq,
      first: first,
      last: last
  };

  //
  // classes.js
  //

  var rnotwhite = /\S+/g;
  var rclass = /[\t\r\n\f]/g;

  function getClass(el) {
      return el.getAttribute && el.getAttribute('class') || '';
  }

  var DOM = {
      addClass: function addClass(cls) {
          var classes = void 0,
              clazz = void 0,
              el = void 0,
              cur = void 0,
              curValue = void 0,
              finalValue = void 0,
              j = void 0,
              i = 0;

          if (typeof cls === 'string' && cls) {
              classes = cls.match(rnotwhite) || [];

              while (el = this[i++]) {
                  curValue = getClass(el);
                  cur = el.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');

                  if (cur) {
                      j = 0;

                      while (clazz = classes[j++]) {
                          // to determine whether the class that to add has already existed
                          if (cur.indexOf(' ' + clazz + ' ') == -1) {
                              cur += clazz + ' ';
                          }
                          finalValue = Clus.trim(cur);
                          if (curValue !== finalValue) {
                              el.setAttribute('class', finalValue);
                          }
                      }
                  }
              }
          }

          return this;
      },
      removeClass: function removeClass(cls) {
          var classes = void 0,
              clazz = void 0,
              el = void 0,
              cur = void 0,
              curValue = void 0,
              finalValue = void 0,
              j = void 0,
              i = 0;

          if (!arguments.length) {
              return;
          }

          if (typeof cls === 'string' && cls) {
              classes = cls.match(rnotwhite) || [];

              while (el = this[i++]) {
                  curValue = getClass(el);
                  cur = el.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');

                  if (cur) {
                      j = 0;

                      while (clazz = classes[j++]) {
                          // to determine whether the class that to add has already existed
                          if (cur.indexOf(' ' + clazz + ' ') !== -1) {
                              cur = cur.replace(' ' + clazz + ' ', ' ');
                          }
                          finalValue = Clus.trim(cur);
                          if (curValue !== finalValue) {
                              el.setAttribute('class', finalValue);
                          }
                      }
                  }
              }
          }

          return this;
      },
      hasClass: function hasClass(cls) {
          var el = void 0,
              i = 0,
              className = ' ' + cls + ' ';

          while (el = this[i++]) {
              if (el.nodeType === 1 && (' ' + getClass(el) + ' ').replace(rclass, ' ').indexOf(className) !== -1) {
                  return true;
              }
          }

          return false;
      },
      toggleClass: function toggleClass(cls) {
          var el = void 0,
              i = 0;

          while (el = this[i++]) {
              if (this.hasClass(cls)) {
                  this.removeClass(cls);
                  return this;
              } else {
                  this.addClass(cls);
                  return this;
              }
          }
      }
  };

  function Clus$1(selector, context) {
      return new Clus$1.fn.init(selector, context);
  }

  Clus$1.fn = Clus$1.prototype = {
      contructor: Clus$1,
      length: 0
  };

  Clus$1.extend = Clus$1.fn.extend = extend;

  // ====================================
  // extend Clus methods
  // ====================================

  Clus$1.extend({
      find: find,
      merge: merge,
      trim: trim
  });

  // ====================================
  // extend selector
  // ====================================

  Clus$1.fn.extend(search);

  // ====================================
  // extend DOM methods
  // ====================================
  Clus$1.fn.extend(DOM);

  window.Clus = window.C = window.$$ = Clus$1;

  //
  // init.js
  //

  function init(Clus) {
      Clus.fn.init = function (selector, context, root) {
          if (!selector) {
              return;
          } else {
              var els = Clus.find(selector);
              if (els.length) {
                  Clus.merge(this, els);
              }
              return this;
          }
      };
      Clus.fn.init.prototype = Clus.fn;
  }

  init(Clus$1);

}));
//# sourceMappingURL=clus.js.map