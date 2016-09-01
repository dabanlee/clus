//
// search.js
//

import { merge, unique } from './utils.js';

function pushStack(els) {
    let ret = merge(this.contructor(), els);
    ret.prevObject = this;
    return ret;
}

function find(selector) {
    let i = 0,
        el,
        ret = this.pushStack([]);

    while((el = this[i++])) {
        ret = merge(ret, el.querySelectorAll(selector));
    }

    return ret;
}

function end() {
    return this.prevObject || this.contructor();
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

function parent(selector) {
    let parents = [], i = 0, len = this.length;
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
    parents = unique(parents)
    return Clus(parents);
}

function parents(selector) {
    let parent, parents = [], i = 0, len = this.length;
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
    parents = unique(parents);
    return Clus(parents);
}

export default {
    pushStack,
    find,
    end,
    eq,
    first,
    last,
    parent,
    parents,
};
