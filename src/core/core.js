//
// core
//

import init from './init';
import extend from './extend';

export default function Clus (selector) {
    return new Clus.fn.init(selector);
}

Clus.fn = Clus.prototype = {
    contructor: Clus,
    init,
};

Clus.fn.init.prototype = Clus.fn;

Clus.extend = Clus.fn.extend = extend;

window.Clus = window.C = window.$ = Clus;
