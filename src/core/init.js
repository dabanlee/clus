//
// init.js
//

export default function init(Clus) {
    Clus.fn.init = function (selector, context) {
        if (!selector) {
            return;
        } else if (Clus.type(selector) === 'function') {
            return Clus(document).ready(selector);
        } else if (selector === document) {
            Clus.merge(this, [document]);
            return this;
        } else if (Clus.type(selector) === 'string') {
            let fragmentRE = /^\s*<(\w+|!)[^>]*>/;
            if (selector[0] === '<' && fragmentRE.test(selector)) {
                let htmls = Clus.parseHTML(selector);
                Clus.merge(this, htmls);
                return this;
            } else {
                let els = Clus.find(selector);
                if (els.length) {
                    Clus.merge(this, els);
                }
                return this;
            }
        }
        return this;
    };
    Clus.fn.init.prototype = Clus.fn;
}
