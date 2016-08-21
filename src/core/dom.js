//
// classes.js
//

const rnotwhite = /\S+/g;
const rclass = /[\t\r\n\f]/g;

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

export default {
    addClass,
    removeClass,
    hasClass,
    toggleClass,
};
