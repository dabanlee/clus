//
// ready.js
//

export default function ready(callback) {
    if (
        document
        &&
        /complete|loaded|interactive/.test(document.readyState)
        &&
        document.body
    ) {
        callback();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            callback();
        }, false);
    }

    return this;
}
