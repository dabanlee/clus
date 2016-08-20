//
// init.js
//

export default function init(Clus) {
    Clus.fn.init = function (selector, context, root) {
        if (!selector) {
            return;
        } else {
            let els = Clus.find(selector);
            if (els.length) {
                Clus.merge(this, els);
            }
            return this;
        }
    };
    Clus.fn.init.prototype = Clus.fn;
}
