// @flow

import {
    query,
    hasClass,
    addClass,
    removeClass,
    toggleClass,
} from './utils/index.js';

let Clus = {
    query: query,
    // class helper
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    // for short
    add: addClass,
    remove: removeClass,
    has: hasClass,
    toggle: toggleClass,
};

window.Clus = Clus;
