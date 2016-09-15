(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define('Clus', factory) :
  (factory());
}(this, (function () { 'use strict';

//
// initialize
//

function init() {
    var selector = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];

    var dom = void 0,
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        selectorType = Clus.type(selector),
        elementTypes = [1, 9, 11];

    if (!selector) {
        dom = [], dom.selector = selector;
    } else if (elementTypes.indexOf(selector.nodeType) !== -1 || selector === window) {
        dom = [selector], selector = null;
    } else if (selectorType === 'function') {
        return Clus(document).ready(selector);
    } else if (selectorType === 'array') {
        dom = selector;
    } else if (selectorType === 'object') {
        dom = [selector], selector = null;
    } else if (selectorType === 'string') {
        if (selector[0] === '<' && fragmentRE.test(selector)) {
            dom = Clus.parseHTML(selector), selector = null;
        } else {
            dom = [].slice.call(document.querySelectorAll(selector));
        }
    }

    dom = dom || [];
    Clus.extend(dom, Clus.fn);
    dom.selector = selector;

    return dom;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
};

//
// extend
//

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

    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' && Clus.type(target) !== 'function') {
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
                if (deep && copy && (Clus.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                    // if copy is array
                    if (copyIsArray) {
                        copyIsArray = false;
                        // if is not array, set it to array
                        clone = source && Array.isArray(source) ? source : [];
                    } else {
                        // if copy is not a object, set it to object
                        clone = source && Clus.isPlainObject(source) ? source : {};
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

//
// core
//

function Clus$1(selector) {
    return new Clus$1.fn.init(selector);
}

Clus$1.fn = Clus$1.prototype = {
    contructor: Clus$1,
    init: init
};

Clus$1.fn.init.prototype = Clus$1.fn;

Clus$1.extend = Clus$1.fn.extend = extend;

window.Clus = window.C = window.$ = Clus$1;

//
// global methods
//

function rootQuery(selector) {
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

function isWindow(object) {
    return object !== null && object === object.window;
}

function isDocument(object) {
    return object !== null && object.nodeType == object.DOCUMENT_NODE;
}

function isArrayLike(object) {
    var len = !!object && 'length' in object && object.length,
        type = Clus.type(object);

    if (type === 'function' || isWindow(object)) return false;

    return type === 'array' || len === 0 || typeof length === 'number' && len > 0 && len - 1 in object;
}

function flatten(array) {
    var ret = [],
        el = void 0,
        i = 0,
        len = array.length;

    for (; i < len; i++) {
        el = array[i];
        if (Array.isArray(el)) {
            ret.push.apply(ret, flatten(el));
        } else {
            ret.push(el);
        }
    }
    return ret;
}

function map(items, callback) {
    var value = void 0,
        values = [],
        len = void 0,
        i = 0;

    if (isArrayLike(items)) {
        len = items.length;
        for (; i < len; i++) {
            value = callback(items[i], i);
            if (value != null) values.push(value);
        }
    } else {
        for (i in items) {
            value = callback(items[i], i);
            if (value != null) values.push(value);
        }
    }

    return flatten(values);
}

function each(items, callback) {
    var len = void 0,
        i = 0;

    if (isArrayLike(items)) {
        len = items.length;
        for (; i < len; i++) {
            if (callback.call(items[i], items[i], i) === false) return items;
        }
    } else {
        for (i in items) {
            if (callback.call(items[i], items[i], i) === false) return items;
        }
    }

    return items;
}

function merge(first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;

    for (; j < len; j++) {
        first[i++] = second[j];
    }

    first.length = i;

    return first;
}

function unique(array) {
    var unique = [],
        i = 0,
        len = array.length;
    for (; i < len; i++) {
        if (unique.indexOf(array[i]) === -1) {
            unique.push(array[i]);
        }
    }
    return unique;
}

function matches(element, selector) {
    if (!selector || !element || element.nodeType !== 1) return false;

    var matchesSelector = element.matchesSelector || element.webkitMatchesSelector || element.mozMatchesSelector || element.msMatchesSelector;

    return matchesSelector.call(element, selector);
}

function parseHTML(DOMString) {
    var htmlDoc = document.implementation.createHTMLDocument();
    htmlDoc.body.innerHTML = DOMString;
    return htmlDoc.body.children;
}

Clus.extend({
    find: rootQuery,
    type: type,
    isPlainObject: isPlainObject,
    isWindow: isWindow,
    isDocument: isDocument,
    isArrayLike: isArrayLike,
    each: each,
    map: map,
    merge: merge,
    trim: trim,
    unique: unique,
    matches: matches,
    parseHTML: parseHTML
});

//
// instance methods
//

function is(selector) {
    return this.length > 0 && Clus.matches(this[0], selector);
}

function instanceMap(callback) {
    return Clus(Clus.map(this, function (item, index) {
        return callback.call(item, item, index);
    }));
}

function instanceEach(callback) {
    [].every.call(this, function (item, index) {
        return callback.call(item, item, index) !== false;
    });
    return this;
}

Clus.fn.extend({
    is: is,
    map: instanceMap,
    each: instanceEach
});

//
// event
//

function on(eventName, selector, handler, capture) {
    var events = eventName.split(' '),
        i = void 0,
        j = void 0;

    for (i = 0; i < this.length; i++) {
        if (Clus.type(selector) === 'function' || selector === false) {
            // Usual events
            if (Clus.type(selector) === 'function') {
                handler = arguments[1];
                capture = arguments[2] || false;
            }
            for (j = 0; j < events.length; j++) {
                // check for namespaces
                if (events[j].indexOf('.') !== -1) {
                    handleNamespaces(this[i], events[j], handler, capture);
                } else {
                    this[i].addEventListener(events[j], handler, capture);
                }
            }
        } else {
            // Live events
            for (j = 0; j < events.length; j++) {
                if (!this[i].DomLiveListeners) {
                    this[i].DomLiveListeners = [];
                }

                this[i].DomLiveListeners.push({
                    handler: handler,
                    liveListener: handleLiveEvent
                });

                if (events[j].indexOf('.') !== -1) {
                    handleNamespaces(this[i], events[j], handleLiveEvent, capture);
                } else {
                    this[i].addEventListener(events[j], handleLiveEvent, capture);
                }
            }
        }
    }

    function handleLiveEvent(event) {
        var k = void 0,
            parents = void 0,
            target = event.target;

        if (Clus(target).is(selector)) {
            handler.call(target, event);
        } else {
            parents = Clus(target).parents();
            for (k = 0; k < parents.length; k++) {
                if (Clus(parents[k]).is(selector)) {
                    handler.call(parents[k], event);
                }
            }
        }
    }

    function handleNamespaces(elm, name, handler, capture) {
        var namespace = name.split('.');

        if (!elm.DomNameSpaces) {
            elm.DomNameSpaces = [];
        }

        elm.DomNameSpaces.push({
            namespace: namespace[1],
            event: namespace[0],
            handler: handler,
            capture: capture
        });

        elm.addEventListener(namespace[0], handler, capture);
    }

    return this;
}

function off(eventName, selector, handler, capture) {
    var events = void 0,
        i = void 0,
        j = void 0,
        k = void 0,
        that = this;

    events = eventName.split(' ');

    for (i = 0; i < events.length; i++) {
        for (j = 0; j < this.length; j++) {
            if (Clus.type(selector) === 'function' || selector === false) {
                // Usual events
                if (Clus.type(selector) === 'function') {
                    handler = arguments[1];
                    capture = arguments[2] || false;
                }

                if (events[i].indexOf('.') === 0) {
                    // remove namespace events
                    removeEvents(events[i].substr(1), handler, capture);
                } else {
                    this[j].removeEventListener(events[i], handler, capture);
                }
            } else {
                // Live event
                if (this[j].DomLiveListeners) {
                    for (k = 0; k < this[j].DomLiveListeners.length; k++) {
                        if (this[j].DomLiveListeners[k].handler === handler) {
                            this[j].removeEventListener(events[i], this[j].DomLiveListeners[k].liveListener, capture);
                        }
                    }
                }
                if (this[j].DomNameSpaces && this[j].DomNameSpaces.length && events[i]) {
                    removeEvents(events[i]);
                }
            }
        }
    }

    function removeEvents(event) {
        var i = void 0,
            j = void 0,
            item = void 0,
            parts = event.split('.'),
            name = parts[0],
            ns = parts[1];

        for (i = 0; i < that.length; ++i) {
            if (that[i].DomNameSpaces) {
                for (j = 0; j < that[i].DomNameSpaces.length; ++j) {
                    item = that[i].DomNameSpaces[j];

                    if (item.namespace == ns && (item.event == name || !name)) {
                        that[i].removeEventListener(item.event, item.handler, item.capture);
                        item.removed = true;
                    }
                }
                // remove the events from the DomNameSpaces array
                for (j = that[i].DomNameSpaces.length - 1; j >= 0; --j) {
                    if (that[i].DomNameSpaces[j].removed) {
                        that[i].DomNameSpaces.splice(j, 1);
                    }
                }
            }
        }
    }

    return this;
}

function trigger(eventName, eventData) {
    var events = eventName.split(' '),
        i = 0,
        j = 0,
        evt = void 0;
    for (; i < events.length; i++) {
        for (; j < this.length; j++) {
            try {
                evt = new CustomEvent(events[i], {
                    detail: eventData,
                    bubbles: true,
                    cancelable: true
                });
            } catch (e) {
                evt = document.createEvent('Event');
                evt.initEvent(events[i], true, true);
                evt.detail = eventData;
            }
            this[j].dispatchEvent(evt);
        }
    }

    return this;
}

Clus.fn.extend({
    on: on,
    off: off,
    trigger: trigger
});

//
// dom search
//

function pushStack(els) {
    var ret = Clus.merge(this.contructor(), els);
    ret.prevObject = this;
    return ret;
}

function find(selector) {
    var i = 0,
        el = void 0,
        ret = this.pushStack([]);

    while (el = this[i++]) {
        ret = Clus.merge(ret, el.querySelectorAll(selector));
    }

    return ret;
}

function end() {
    return this.prevObject || this.contructor();
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

function parent(selector) {
    var parents = [],
        i = 0,
        len = this.length;
    for (; i < len; i++) {
        if (this[i].parentNode !== null) {
            if (selector) {
                if (Clus(this[i].parentNode).is(selector)) {
                    parents.push(this[i].parentNode);
                }
            } else {
                parents.push(this[i].parentNode);
            }
        }
    }
    parents = Clus.unique(parents);
    return Clus(parents);
}

function parents(selector) {
    var parent = void 0,
        parents = [],
        i = 0,
        len = this.length;
    for (; i < len; i++) {
        parent = this[i].parentNode;
        while (parent) {
            if (selector) {
                if (Clus(parent).is(selector)) {
                    parents.push(parent);
                }
            } else {
                parents.push(parent);
            }
            parent = parent.parentNode;
        }
    }
    parents = Clus.unique(parents);
    return Clus(parents);
}

function children(selector) {
    var children = [],
        childNodes = void 0,
        i = 0,
        j = 0,
        len = this.length;
    for (; i < len; i++) {
        childNodes = this[i].childNodes;
        for (; j < childNodes.length; j++) {
            if (!selector) {
                if (childNodes[j].nodeType === 1) {
                    children.push(childNodes[j]);
                }
            } else {
                if (childNodes[j].nodeType === 1 && Clus(childNodes[j]).is(selector)) {
                    children.push(childNodes[j]);
                }
            }
        }
    }

    return Clus(Clus.unique(children));
}

Clus.fn.extend({
    pushStack: pushStack,
    find: find,
    end: end,
    eq: eq,
    first: first,
    last: last,
    parent: parent,
    parents: parents,
    children: children
});

//
// dom
//

var rnotwhite = /\S+/g;
var rclass = /[\t\r\n\f]/g;

function ready(callback) {
    if (document && /complete|loaded|interactive/.test(document.readyState) && document.body) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            callback();
        }, false);
    }

    return this;
}

function getClass(el) {
    return el.getAttribute && el.getAttribute('class') || '';
}

function addClass(cls) {
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
}

function removeClass(cls) {
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
}

function hasClass(cls) {
    var el = void 0,
        i = 0,
        className = ' ' + cls + ' ';

    while (el = this[i++]) {
        if (el.nodeType === 1 && (' ' + getClass(el) + ' ').replace(rclass, ' ').indexOf(className) !== -1) {
            return true;
        }
    }

    return false;
}

function toggleClass(cls) {
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

function append(DOMString) {
    var el = void 0,
        i = 0,
        fregmentCollection = Clus.parseHTML(DOMString),
        fregments = Array.prototype.slice.apply(fregmentCollection);

    while (el = this[i++]) {
        fregments.map(function (fregment) {
            el.appendChild(fregment);
        });
    }

    return this;
}

function appendTo(selector) {
    var fregment = void 0,
        i = 0,
        elCollection = Clus.find(selector),
        els = Array.prototype.slice.apply(elCollection);

    while (fregment = this[i++]) {
        els.map(function (el) {
            el.appendChild(fregment);
        });
    }
}

function attr(attrs, value) {
    var attr = void 0,
        attrName = void 0,
        i = 0;

    if (arguments.length === 1 && typeof attrs === 'string' && this.length) {
        // get
        attr = this[0].getAttribute(attrs);
        return this[0] && (attr || attr === '') ? attr : undefined;
    } else {
        // set
        for (; i < this.length; i++) {
            if (arguments.length === 2) {
                // string
                this[i].setAttribute(attrs, value);
            } else {
                // object
                for (attrName in attrs) {
                    this[i][attrName] = attrs[attrName];
                    this[i].setAttribute(attrName, attrs[attrName]);
                }
            }
        }

        return this;
    }
}

function removeAttr(attr) {
    for (var i = 0; i < this.length; i++) {
        this[i].removeAttribute(attr);
    }

    return this;
}

Clus.fn.extend({
    ready: ready,
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    append: append,
    appendTo: appendTo,
    attr: attr,
    removeAttr: removeAttr
});

//
// ajax
//

function ajax() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var xhr = new XMLHttpRequest(),
        type = option.type.toUpperCase() || 'GET',
        url = option.url || '',
        data = option.data,
        success = option.success || function success() {},
        error = option.error || function error() {},
        params = void 0;

    params = function (data) {
        var params = '',
            prop = void 0;
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                params += prop + '=' + data[prop] + '&';
            }
        }
        params = params.slice(0, params.length - 1);
        return params;
    }(data);

    if (!url) console.error('url must be specified.');

    if (type === 'GET') url += url.indexOf('?') === -1 ? '?' + params : '&' + params;

    xhr.open(type, url);

    if (type === 'POST') xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(params ? params : null);

    xhr.onload = function () {
        if (xhr.status === 200) {
            success(resToJson(xhr.response));
        } else {
            error(resToJson(xhr.response));
        }
    };
}

function resToJson(res) {
    return JSON.parse(res);
}

Clus.extend({
    ajax: ajax
});

//
// css
//

var humpRE = /\-(\w)/g;

function humpize(rules) {
    return rules.replace(humpRE, function (_, letter) {
        return letter.toUpperCase();
    });
}

function css(rules, value) {
    var rule = void 0;
    if (Clus.type(rules) === 'string') {
        if (value === '' || Clus.type(value) === 'undefined' || Clus.type(value) === 'null') {
            return document.defaultView.getComputedStyle(this[0], null).getPropertyValue(rules);
        } else {
            this.each(function (el) {
                return el.style[humpize(rules)] = value;
            });
        }
    } else {
        for (rule in rules) {
            this.each(function (el) {
                return el.style[humpize(rule)] = rules[rule];
            });
        }
    }
    return this;
}

function width(width) {
    if (width !== undefined) {
        this.each(function (el) {
            el.style.width = width + 'px';
        });
    }

    var el = this[0];

    switch (el) {
        case window:
            {
                return window.innerWidth;
            }
        case document:
            {
                return document.documentElement.scrollWidth;
            }
        default:
            {
                return this.length > 0 ? parseFloat(this.css('width')) : null;
            }
    }
}

function height(height) {
    if (height !== undefined) {
        this.each(function (el) {
            el.style.height = height + 'px';
        });
    }

    var el = this[0];

    switch (el) {
        case window:
            {
                return window.innerHeight;
            }
        case document:
            {
                var body = document.body,
                    html = document.documentElement,
                    heights = [body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight];

                return Math.max.apply(Math, heights);
            }
        default:
            {
                return this.length > 0 ? parseFloat(this.css('height')) : null;
            }
    }
}

Clus.fn.extend({
    css: css,
    width: width,
    height: height
});

})));
//# sourceMappingURL=clus.js.map
