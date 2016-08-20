//
// init.js
//

export default function init(Clus) {
    Clus.fn.init = function (selector, context, root) {
        if (!selector) {
            return;
        } else {
            let el = document.querySelector(selector);
            if (el) {
                this[0] = el;
                this.length = 1;
            }
            return this;
        }
    };
    Clus.fn.init.prototype = Clus.fn;
}
