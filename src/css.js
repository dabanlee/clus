//
// css
//

const humpRE = /\-(\w)/g;

function humpize(rules) {
    return rules.replace(humpRE, (_, letter) => letter.toUpperCase());
}

function css(rules, value) {
    let rule;
    if (Clus.type(rules) === 'string') {
        if (value === '' || Clus.type(value) === 'undefined' || Clus.type(value) === 'null') {
            return document.defaultView.getComputedStyle(this[0], null).getPropertyValue(rules);
        } else {
            this.each(el => el.style[humpize(rules)] = value);
        }
    } else {
        for (rule in rules) {
            this.each(el => el.style[humpize(rule)] = rules[rule]);
        }
    }
    return this;
}

function width(width) {
    if (width !== undefined) {
        return this.css('width', width);
    }

    let el = this[0];

    switch (el) {
        case window:
            return window.innerWidth;
            break;
        case document:
            return document.documentElement.scrollWidth;
            break;
        default:
            return this.length > 0 ? parseFloat(this.css('width')) : null;
    }
}

function height(height) {
    if (height !== undefined) {
        return this.css('height', height);
    }

    let el = this[0];

    switch (el) {
        case window:
            return window.innerHeight;
            break;
        case document:
            let body = document.body,
                html = document.documentElement,
                heights = [body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight];

            return Math.max.apply(Math, heights);
            break;
        default:
            return this.length > 0 ? parseFloat(this.css('height')) : null;
    }
}

Clus.fn.extend({
    css,
    width,
    height,
});
