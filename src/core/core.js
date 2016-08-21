//
// Core.js
//

import extend from './extend.js';
import { find, merge, trim } from './utils.js';
import search from './search.js';
import DOM from './dom.js';

export default function Clus(selector, context) {
    return new Clus.fn.init(selector, context);
}

Clus.fn = Clus.prototype = {
    contructor: Clus,
    length: 0,
};

Clus.extend = Clus.fn.extend = extend;

// ====================================
// extend Clus methods
// ====================================

Clus.extend({
    find,
    merge,
    trim,
});

// ====================================
// extend selector
// ====================================

Clus.fn.extend(search);

// ====================================
// extend DOM methods
// ====================================
Clus.fn.extend(DOM);

window.Clus = window.C = window.$ = Clus;
