// @flow

export default function Clus( selector ) {
    return Clus.prototype.init( selector );
}

Clus.prototype = {
    constructor: Clus,
    version: '1.0.0',
    nodes: [],
    init: function( selector ) {
        if ( !selector ) {
            return this.nodes;
        }

        if ( typeof selector === 'string' ) {
            let el = document.querySelectorAll(selector);
            if ( el ) {
                this.nodes = Array.prototype.slice.call(el);
            }
            return this;
        } else if (selector.nodeType) {
            this.nodes = selector;
			return this;
        } else {
            return this.nodes;
        }
    },
    addClass: function(cls) {
        if( !cls ) {
            return this;
        }

        this.nodes.map((node) => {
            node.classList.add(cls);
        });
        return this;
    },
    removeClass: function(cls) {
        if( !cls ) {
            return this;
        }

        this.nodes.map((node) => {
            node.classList.remove(cls);
        });
        return this;
    },
    hasClass: function(cls) {
        if( !cls ) {
            return this;
        }

        this.nodes.map((node) => {
            node.classList.contains(cls);
        });
    },
    toggleClass: function(cls) {
        if(this.hasClass(cls)) {
            this.removeClass(cls);
        } else {
            this.addClass(cls);
        }
        return this;
    },
};

window.Clus = window.C = Clus;
