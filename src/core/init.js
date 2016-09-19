//
// initialize
//

/**
 * Initialize
 *
 * @method init
 * @param  {String} selector
 * @return {DOM} DOMList
 */
export default function init(selector) {
    let dom,
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        selectorType = Clus.type(selector),
        elementTypes = [1, 9, 11];

    if (!selector) {
        dom = [],
        dom.selector = selector;
    } else if (elementTypes.indexOf(selector.nodeType) !== -1 || selector === window) {
        dom = [selector],
        selector = null;
    } else if (selectorType === 'function') {
        return Clus(document).ready(selector);
    } else if (selectorType === 'array') {
        dom = selector;
    } else if (selectorType === 'object') {
        dom = [selector],
        selector = null;
    } else if (selectorType === 'string') {
        if (selector[0] === '<' && fragmentRE.test(selector)) {
            dom = Clus.parseHTML(selector),
            selector = null;
        } else {
            dom = [].slice.call(document.querySelectorAll(selector));
        }
    }

    dom = dom || [];
    Clus.extend(dom, Clus.fn);
    dom.selector = selector;

    return dom;
}
