// @flow

import {
    addClass,
    removeClass,
    hasClass,
    query,
} from './utils/index.js';

let Clus = {
    query: query,
    // class helper
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    // for short
    add: addClass,
    remove: removeClass,
    has: hasClass,
};

window.Clus = Clus;
