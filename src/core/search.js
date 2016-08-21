//
// search.js
//

import { merge } from './utils.js';

function pushStack(els) {
    let ret = merge(this.contructor(), els);
    ret.prevObject = this;
    return ret;
}

function find(selector) {
    let i = 0,
        len = this.length,
        self = this,
        ret = this.pushStack([]);

    for (; i < len; i++) {
        Clus.find(selector, self[ i ], ret);
    }

    return ret;
}

function end() {
    return this.prevObject || this.constructor();
}

function eq(i) {
    let len = this.length,
        j = +i + ( i < 0 ? len : 0 ); // reverse find
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
}

function first() {
    return this.eq(0);
}

function last() {
    return this.eq(-1);
}

export default {
    pushStack,
    find,
    end,
    eq,
    first,
    last,
}
