//
// Core.js
//

import extend from './extend.js';

export default function Clus(selector, context) {
    return new Clus.fn.init(selector, context);
}

Clus.fn = Clus.prototype = {
    contructor: Clus,
    length: 0,
};

Clus.extend = Clus.fn.extend = extend;

window.Clus = window.C = window.$$ = Clus;
