//
// utils.js
//

let class2type = {};
const toString = class2type.toString; // Object.prototype.toString
const hasOwn = class2type.hasOwnProperty;
const fnToString = hasOwn.toString; // Object.toString/Function.toString
const ObjectFunctionString = fnToString.call( Object ); // 'function Object() { [native code] }'

export function isObject(object) {
    return Object.prototype.toString.call(object) === '[object Object]';
}

export function isArray(object) {
     return Object.prototype.toString.call(object) === '[object Array]';
}

export function type(object) {
    let class2type = {},
        type = class2type.toString.call(object),
        typeString = 'Boolean Number String Function Array Date RegExp Object Error Symbol';

    if (object == null) {
        return object + '';
    }

    typeString.split(' ').forEach((type) => {
        class2type[`[object ${type}]`] = type.toLowerCase();
    });

    return (
        typeof object === 'object' ||
        typeof object === 'function'
        ?
        class2type[type] || 'object'
        :
        typeof object
    );
}

export function isPlainObject(object) {
    let proto, ctor;

    if (!object || toString.call(object) !== '[object Object]') {
        return false;
    }

    // According to the object created by `Object.create(null)` is no `prototype`
    proto = Object.getPrototypeOf(object);
    if (!proto) {
        return true;
    }

    ctor = hasOwn.call(proto, 'constructor') && proto.constructor;
    return typeof ctor === 'function' && fnToString.call( ctor ) === ObjectFunctionString;
}
