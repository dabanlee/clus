//
// utils.js
//

export function trim(text) {
    const rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    return text == null ? '' : `${text}`.replace(rtrim, '');
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
    let proto,
        ctor,
        class2type = {},
        toString = class2type.toString, // Object.prototype.toString
        hasOwn = class2type.hasOwnProperty,
        fnToString = hasOwn.toString, // Object.toString/Function.toString
        ObjectFunctionString = fnToString.call( Object ); // 'function Object() { [native code] }'

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

export function merge(first, second) {
    let length = +second.length,
		j = 0,
		i = first.length;

	for ( ; j < length; j++ ) {
		first[ i++ ] = second[ j ];
	}

	first.length = i;

	return first;
}
