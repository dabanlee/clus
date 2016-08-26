//
// Core.js
//

import { rootQuery, merge, trim, type } from './utils.js';
import init from './init.js';
import extend from './extend.js';
import search from './search.js';
import DOM from './dom/index.js';
import parseHTML from './dom/parseHTML.js';

export default function Clus (selector) {
    return new Clus.fn.init(selector);
}

Clus.fn = Clus.prototype = {
    contructor: Clus,
    init,
};

Clus.fn.init.prototype = Clus.fn;

Clus.extend = Clus.fn.extend = extend;

// ====================================
// extend Clus methods
// ====================================

Clus.extend({
    find: rootQuery,
    merge,
    trim,
    type,
    parseHTML,
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
