//
// css
//

const humpRE = /\-(\w)/g;

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

function humpize(rules) {
    return rules.replace(humpRE, (_, letter) => letter.toUpperCase());
}

Clus.fn.extend({
    css,
});
