//
// Core.js
//

import extend from './extend.js';
import { find, merge, trim } from './utils.js';
import DOM from './dom.js';

export default function Clus(selector, context) {
    return new Clus.fn.init(selector, context);
}

Clus.fn = Clus.prototype = {
    contructor: Clus,
    length: 0,
};

Clus.extend = Clus.fn.extend = extend;

Clus.extend({
    find,
    merge,
    trim,
});

// ============
// extend selector
// ============

Clus.fn.extend({
    pushStack: function (els) {
        let ret = merge(this.contructor(), els);
        ret.prevObject = this;
        return ret;
    },
    find: function (selector) {
        let i = 0,
            len = this.length,
            self = this,
            ret = this.pushStack([]);

        for (; i < len; i++) {
            Clus.find(selector, self[ i ], ret);
        }

        return ret;
    },
    end: function end() {
        return this.prevObject || this.constructor();
    },
    eq: function eq(i) {
        let len = this.length,
            j = +i + ( i < 0 ? len : 0 ); // reverse find
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    first: function first() {
        return this.eq(0);
    },
    last: function last() {
        return this.eq(-1);
    },
});

// ============
// extend DOM methods
// ============
Clus.fn.extend(DOM);

window.Clus = window.C = window.$$ = Clus;
