//
// sizzle initialize
//

import Sizzle from './sizzle.js';

export default function initSizzle(Clus) {
    Clus.find = Clus.fn.find = Sizzle;
}
