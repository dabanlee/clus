// @flow

export function query(selector) {
    return document.querySelector(selector);
}

export function getClass(el) {
    return el ? el.className : '';
}

export function setClass(el, cls) {
    return el ? el.setAttribute('class', cls) : '';
}

export function hasClass(el, cls) {
    if(el && el.classList) {
        return el.classList.contains(cls);
    } else {
        if(el) {
            let classList = el.className.split(' ');
            classList.map((item) => {
                return item == cls ? true : false;
            });
        } else {
            return false;
        }
    }
}

export function addClass(el, cls) {
    if(el && el.classList) {
        el.classList.add(cls);
    } else {
        let current = ` ${getClass(el)} `;
        if(current.indexOf(` ${cls} `) < 0) {
            setClass(el, (current + cls).trim());
        }
    }
}

export function removeClass(el, cls) {
    if(el && el.classList) {
        el.classList.remove(cls);
    } else {
        let current = ` ${getClass(el)} `,
            target = ` ${cls} `;
        while(current.indexOf(target) >= 0) {
          current = current.replace(target, ' ');
        }
        setClass(el, current.trim());
    }
    if (!el.className) {
        el.removeAttribute('class');
    }
}
