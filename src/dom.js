//
// dom
//

const rnotwhite = /\S+/g;
const rclass = /[\t\r\n\f]/g;

function ready(callback) {
    if (
        document
        &&
        /complete|loaded|interactive/.test(document.readyState)
        &&
        document.body
    ) {
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
    let classes, clazz, el, cur, curValue, finalValue, j, i = 0;

    if (typeof cls === 'string' && cls) {
        classes = cls.match(rnotwhite) || [];

        while((el = this[i++])) {
            curValue = getClass(el);
            cur = (el.nodeType === 1) && ` ${curValue} `.replace(rclass, ' ');

            if (cur) {
                j = 0;

                while((clazz = classes[j++])) {
                    // to determine whether the class that to add has already existed
                    if (cur.indexOf(` ${clazz} `) == -1) {
                        cur += clazz + ' ';
                    }
                    finalValue = Clus.trim(cur);
                    if ( curValue !== finalValue ) {
                        el.setAttribute('class', finalValue);
                    }
                }
            }
        }
    }

    return this;
}

function removeClass(cls) {
    let classes, clazz, el, cur, curValue, finalValue, j, i = 0;

    if (!arguments.length) {
        return;
    }

    if (typeof cls === 'string' && cls) {
        classes = cls.match(rnotwhite) || [];

        while((el = this[i++])) {
            curValue = getClass(el);
            cur = (el.nodeType === 1) && ` ${curValue} `.replace(rclass, ' ');

            if (cur) {
                j = 0;

                while((clazz = classes[j++])) {
                    // to determine whether the class that to add has already existed
                    if (cur.indexOf(` ${clazz} `) !== -1) {
                        cur = cur.replace(` ${clazz} `, ' ');
                    }
                    finalValue = Clus.trim(cur);
                    if ( curValue !== finalValue ) {
                        el.setAttribute('class', finalValue);
                    }
                }
            }
        }
    }

    return this;
}

function hasClass(cls) {
    let el, i = 0, className = ` ${cls} `;

    while((el = this[i++])) {
        if (
            el.nodeType === 1
            &&
            ` ${getClass(el)} `.replace(rclass, ' ').indexOf(className) !== -1
        ) {
            return true;
        }
    }

    return false;
}

function toggleClass(cls) {
    let el, i = 0;

    while((el = this[i++])) {
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
    let el, i = 0,
        fregmentCollection = Clus.parseHTML(DOMString),
        fregments = Array.prototype.slice.apply(fregmentCollection);

    while((el = this[i++])) {
        fregments.map(fregment => {
            el.appendChild(fregment);
        });
    }

    return this;
}

function appendTo(selector) {
    let fregment, i = 0,
        elCollection = Clus.find(selector),
        els = Array.prototype.slice.apply(elCollection);

    while((fregment = this[i++])) {
        els.map(el => {
            el.appendChild(fregment);
        });
    }
}

function attr(attrs, value) {
    let attr, attrName, i = 0;

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
    for (let i = 0; i < this.length; i++) {
        this[i].removeAttribute(attr);
    }

    return this;
}

Clus.fn.extend({
    ready,
    addClass,
    removeClass,
    hasClass,
    toggleClass,
    append,
    appendTo,
    attr,
    removeAttr,
});
