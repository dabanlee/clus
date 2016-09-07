//
// dom search
//

function pushStack(els) {
    let ret = Clus.merge(this.contructor(), els);
    ret.prevObject = this;
    return ret;
}

function find(selector) {
    let i = 0,
        el,
        ret = this.pushStack([]);

    while((el = this[i++])) {
        ret = Clus.merge(ret, el.querySelectorAll(selector));
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
    parents = Clus.unique(parents);
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
    parents = Clus.unique(parents);
    return Clus(parents);
}

function children(selector) {
    let children = [], childNodes, i = 0, j = 0, len = this.length;
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
    pushStack,
    find,
    end,
    eq,
    first,
    last,
    parent,
    parents,
    children,
});
