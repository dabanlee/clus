//
// instance methods
//

function is(selector) {
    return this.length > 0 && Clus.matches(this[0], selector);
}

function instanceMap(callback) {
    return Clus(Clus.map(this, function(item, index) {
        return callback.call(item, item, index);
    }));
}

function instanceEach(callback) {
    [].every.call(this, function(item, index) {
        return callback.call(item, item, index) !== false;
    });
    return this;
}

Clus.fn.extend({
    is,
    map: instanceMap,
    each: instanceEach,
});
