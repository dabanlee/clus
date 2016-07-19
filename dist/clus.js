(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('Clus', factory) :
    (global.Clus = factory());
}(this, function () { 'use strict';

    function Clus(selector) {
        return Clus.prototype.init(selector);
    }

    Clus.prototype = {
        constructor: Clus,
        version: '1.0.0',
        nodes: [],
        init: function init(selector) {
            if (!selector) {
                return this.nodes;
            }

            if (typeof selector === 'string') {
                var el = document.querySelectorAll(selector);
                if (el) {
                    this.nodes = Array.prototype.slice.call(el);
                }
                return this;
            } else if (selector.nodeType) {
                this.nodes = selector;
                return this;
            } else {
                return this.nodes;
            }
        },
        addClass: function addClass(cls) {
            if (!cls) {
                return this;
            }

            this.nodes.map(function (node) {
                node.classList.add(cls);
            });
            return this;
        },
        removeClass: function removeClass(cls) {
            if (!cls) {
                return this;
            }

            this.nodes.map(function (node) {
                node.classList.remove(cls);
            });
            return this;
        },
        hasClass: function hasClass(cls) {
            if (!cls) {
                return this;
            }

            this.nodes.map(function (node) {
                node.classList.contains(cls);
            });
        },
        toggleClass: function toggleClass(cls) {
            if (this.hasClass(cls)) {
                this.removeClass(cls);
            } else {
                this.addClass(cls);
            }
            return this;
        }
    };

    window.Clus = window.C = Clus;

    return Clus;

}));
//# sourceMappingURL=clus.js.map