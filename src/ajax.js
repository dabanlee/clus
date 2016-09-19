//
// ajax
//

/**
 * Initiate a Ajax request
 *
 * @method ajax
 * @param  {Object} option
 */
function ajax(option = {}) {
    let xhr = new XMLHttpRequest(),
        type = option.type.toUpperCase() || 'GET',
        url = option.url || '',
        data = option.data,
        success = option.success || function success() {},
        error = option.error || function error() {},
        params;

    params = (function (data) {
        let params = '', prop;
        for (prop in data) {
            if (data.hasOwnProperty(prop)) {
                params += prop + '=' + data[prop] + '&';
            }
        }
        params = params.slice(0, params.length - 1);
        return params;
    })(data);

    if (!url) console.error('url must be specified.');

    if (type === 'GET') url += url.indexOf('?') === -1 ? '?' + params : '&' + params;

    xhr.open(type, url);

    if (type === 'POST') xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.send(params ? params : null);

    xhr.onload = function () {
        if (xhr.status === 200) {
            success(resToJson(xhr.response));
        } else {
            error(resToJson(xhr.response));
        }
    };
}

/**
 * Parse response to json
 *
 * @method resToJson
 * @param  {String}  response
 * @return {Object}  object
 */
function resToJson(response) {
    return JSON.parse(response);
}

Clus.extend({
    ajax,
});
