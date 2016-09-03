//
// event
//

export function on(eventName, selector, handler, capture) {
    let events = eventName.split(' '), i, j;

    for (i = 0; i < this.length; i++) {
        if (Clus.type(selector) === 'function' || selector === false) {
            // Usual events
            if (Clus.type(selector) === 'function') {
                handler = arguments[1];
                capture = arguments[2] || false;
            }
            for (j = 0; j < events.length; j++) {
                // check for namespaces
                if (events[j].indexOf('.') != -1) {
                    handleNamespaces(this[i], events[j], handler, capture);
                } else {
                    this[i].addEventListener(events[j], handler, capture);
                }
            }
        } else {
            // Live events
            for (j = 0; j < events.length; j++) {
                if (!this[i].DomLiveListeners) {
                    this[i].DomLiveListeners = [];
                }

                this[i].DomLiveListeners.push({
                    handler: handler,
                    liveListener: handleLiveEvent
                });

                if (events[j].indexOf('.') != -1) {
                    handleNamespaces(this[i], events[j], handleLiveEvent, capture);
                } else {
                    this[i].addEventListener(events[j], handleLiveEvent, capture);
                }
            }
        }
    }

    function handleLiveEvent(event) {
        let k,
            parents,
            target = event.target;

        if (Clus(target).is(selector)) {
            handler.call(target, event);
        } else {
            parents = Clus(target).parents();
            for (k = 0; k < parents.length; k++) {
                if (Clus(parents[k]).is(selector)) {
                    handler.call(parents[k], event);
                }
            }
        }
    }

    function handleNamespaces(elm, name, handler, capture) {
        let namespace = name.split('.');

        if (!elm.DomNameSpaces) {
            elm.DomNameSpaces = [];
        }

        elm.DomNameSpaces.push({
            namespace: namespace[1],
            event: namespace[0],
            handler: handler,
            capture: capture
        });

        elm.addEventListener(namespace[0], handler, capture);
    }

    return this;
}

export function off(eventName, selector, handler, capture) {
    let events,
        i, j, k,
        that = this;

    events = eventName.split(' ');

    for (i = 0; i < events.length; i++) {
        for (j = 0; j < this.length; j++) {
            if (Clus.type(selector) === 'function' || selector === false) {
                // Usual events
                if (Clus.type(selector) === 'function') {
                    handler = arguments[1];
                    capture = arguments[2] || false;
                }

                if (events[i].indexOf('.') === 0) { // remove namespace events
                    removeEvents(events[i].substr(1), handler, capture);
                } else {
                    this[j].removeEventListener(events[i], handler, capture);
                }
            } else {
                // Live event
                if (this[j].DomLiveListeners) {
                    for (k = 0; k < this[j].DomLiveListeners.length; k++) {
                        if (this[j].DomLiveListeners[k].handler === handler) {
                            this[j].removeEventListener(events[i], this[j].DomLiveListeners[k].liveListener, capture);
                        }
                    }
                }
                if (this[j].DomNameSpaces && this[j].DomNameSpaces.length && events[i]) {
                    removeEvents(events[i]);
                }
            }
        }
    }

    function removeEvents(event) {
        let i, j,
            item,
            parts = event.split('.'),
            name = parts[0],
            ns = parts[1];

        for (i = 0; i < that.length; ++i) {
            if (that[i].DomNameSpaces) {
                for (j = 0; j < that[i].DomNameSpaces.length; ++j) {
                    item = that[i].DomNameSpaces[j];

                    if (item.namespace == ns && (item.event == name || !name)) {
                        that[i].removeEventListener(item.event, item.handler, item.capture);
                        item.removed = true;
                    }
                }
                // remove the events from the DomNameSpaces array
                for (j = that[i].DomNameSpaces.length - 1; j >= 0; --j) {
                    if (that[i].DomNameSpaces[j].removed) {
                        that[i].DomNameSpaces.splice(j, 1);
                    }
                }
            }
        }
    }

    return this;
}

export default {
    on,
    off,
};
