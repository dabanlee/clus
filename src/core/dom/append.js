//
// append.js
//

export function appendTo(selector) {
    let fregment, i = 0,
        elCollection = Clus.find(selector),
        els = Array.prototype.slice.apply(elCollection);

    while((fregment = this[i++])) {
        els.map(el => {
            el.appendChild(fregment);
        });
    }
}

export function append(DOMString) {
    let el, i = 0,
        fregmentCollection = Clus.parseHTML(DOMString),
        fregments = Array.prototype.slice.apply(fregmentCollection);

    while((el = this[i++])) {
        fregments.map(fregment => {
            el.appendChild(fregment);
        });
    }

    return this;
}
