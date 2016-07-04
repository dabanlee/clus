(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
    typeof define === 'function' && define.amd ? define('Clus', factory) :
    (factory());
}(this, function () { 'use strict';

    function query(selector) {
        return document.querySelector(selector);
    }

    function getClass(el) {
        return el ? el.className : '';
    }

    function setClass(el, cls) {
        return el ? el.setAttribute('class', cls) : '';
    }

    function hasClass(el, cls) {
        if (el && el.classList) {
            return el.classList.contains(cls);
        } else {
            if (el) {
                var classList = el.className.split(' ');
                classList.map(function (item) {
                    return item == cls ? true : false;
                });
            } else {
                return false;
            }
        }
    }

    function addClass(el, cls) {
        if (el && el.classList) {
            el.classList.add(cls);
        } else {
            var current = ' ' + getClass(el) + ' ';
            if (current.indexOf(' ' + cls + ' ') < 0) {
                setClass(el, (current + cls).trim());
            }
        }
    }

    function removeClass(el, cls) {
        if (el && el.classList) {
            el.classList.remove(cls);
        } else {
            var current = ' ' + getClass(el) + ' ',
                target = ' ' + cls + ' ';
            while (current.indexOf(target) >= 0) {
                current = current.replace(target, ' ');
            }
            setClass(el, current.trim());
        }
        if (!el.className) {
            el.removeAttribute('class');
        }
    }

    function toggleClass(el, cls) {
        if (hasClass(el, cls)) {
            removeClass(el, cls);
        } else {
            addClass(el, cls);
        }
    }

    var Clus = {
        query: query,
        // class helper
        addClass: addClass,
        removeClass: removeClass,
        hasClass: hasClass,
        toggleClass: toggleClass,
        // for short
        add: addClass,
        remove: removeClass,
        has: hasClass,
        toggle: toggleClass
    };

    window.Clus = Clus;

}));
//# sourceMappingURL=clus.js.map