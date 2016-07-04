// @flow

import { addClass, removeClass, hasClass, } from './utils/index.js';

let clus = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    // for short
    add: addClass,
    remove: removeClass,
    has: hasClass,
};

window.clus = clus;
