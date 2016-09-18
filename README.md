# Clus - A minimalist JavaScript library for modern browsers.

[![dependencies](https://david-dm.org/justclear/clus.svg)](https://david-dm.org/justclear/clus#info=dependencies&view=table)
[![devDependencies](https://david-dm.org/justclear/clus/dev-status.svg)](https://david-dm.org/justclear/clus#info=devDependencies&view=table)

## Emoji Commit

Commit Type             | Emoji
----------------------- | -------------
Initial Commit          | :tada: `:tada:`
Structure               | :art: `:art:`
Documentation           | :memo: `:memo:`
New Idea                | :bulb: `:bulb:`
New Feature             | :sparkles: `:sparkles:`
Bug                     | :bug: `:bug:`
Version Tag             | :bookmark: `:bookmark:`
Performance             | :racehorse: `:racehorse:`
Tooling                 | :wrench: `:wrench:`
Tests                   | :rotating_light: `:rotating_light:`
Deprecation             | :poop: `:poop:`
Work In Progress (WIP)  | :construction: `:construction:`
Upgrading               | :arrow_up: `:arrow_up:`

Example:

> ":art: fixing coding standard"

## Usage

### Install

```sh
$ npm i clus --save
# or
$ bower i clus
```

### Global methods

- <a href="#ajax">`$.ajax()`</a>
- <a href="#each-global">`$.each()`</a>
- <a href="#map-global">`$.map()`</a>

### Instance methods

- <a href="#ready">`.ready()`</a>
- <a href="#add-class">`.addClass()`</a>
- <a href="#remove-class">`.removeClass()`</a>
- <a href="#has-class">`.hasClass()`</a>
- <a href="#toggle-class">`.toggleClass()`</a>
- <a href="#append">`.append()`</a>
- <a href="#append-to">`.appendTo()`</a>
- <a href="#parent">`.parent()`</a>
- <a href="#parents">`.parents()`</a>
- <a href="#children">`.children()`</a>
- <a href="#each-instance">`.each()`</a>
- <a href="#map-instance">`.map()`</a>
- <a href="#on">`.on()`</a>
- <a href="#off">`.off()`</a>
- <a href="#trigger">`.trigger()`</a>
- <a href="#width">`.width()`</a>
- <a href="#height">`.height()`</a>

### DOM

<a name="ready"></a>
#### `$(document).ready()`

```js
$(document).ready(function () {
    // DOM is ready
});

// or

$(function () {
    // DOM is ready
});
```

<a name="add-class"></a>
#### `.addClass(className)`

Example:

```js
$('.hello').addClass('world');
$('p').addClass('hello world');
// or
$('p').addClass('hello').addClass('world');
```

<a name="remove-class"></a>
#### `.removeClass(className)`

Example:

```js
$('.hello').removeClass('hello').addClass('hi');
$('p').addClass('hello world').removeClass('hello world');
// or
$('p').addClass('hello world').removeClass('hello').removeClass('world');
```

<a name="has-class"></a>
#### `.hasClass(className)`

Example:

```js
$('p').hasClass('hello'); // true
$('p').hasClass('world'); // false
```

<a name="toggle-class"></a>
#### `.toggleClass(className)`

Example:

```js
$('p').toggleClass('hello');
```

<a name="append"></a>
#### `.append(DOMString)`

Example:

```js
$('body').append('<h1>Hello Clus</h1>');
```

<a name="append-to"></a>
#### `.appendTo(selector)`

Example:

```js
$('<h1>Hello Clus</h1>').appendTo('body');
```

<a name="parent"></a>
#### `.parent()`

Example:

```js
$('.hello').parent();
```

<a name="parents"></a>
#### `.parents()`

Example:

```js
$('.hello').parents();
$('.hello').parents('body');
```

<a name="children"></a>
#### `.children()`

Example:

```js
$('.hello').children();
$('.hello').children('.world');
```

<a name="each-global"></a>
#### `$.each()`

Example:

```js
$.each(['just', 'hello', 'world'], function (item, index) {
    console.log(item, index);
});
// just 0
// hello 1
// world 2
```

<a name="each-instance"></a>
#### `.each()`

Example:

```js
$('.hello').each(function (item, index) {
    $(this).addClass('world');
    console.log($(this));
});
```

<a name="map-global"></a>
#### `$.map()`

Example:

```js
$.map(['just', 'hello', 'world'], function (item, index) {
    console.log(item, index);
});
// just 0
// hello 1
// world 2
```

<a name="map-instance"></a>
#### `.map()`

Example:

```js
$('.hello').map(function (item, index) {
    $(this).addClass('world');
    console.log($(this));
});
```

<a name="on"></a>
#### `.on()`

Example:

```js
$('.hello').on('click', function () {
    console.log($(this));
});

$(document).on('click', '.hello', function () {
    console.log($(this));
});
```

<a name="off"></a>
#### `.off()`

Example:

```js
let hello = function () {
    console.log('hello');
}
$(document).on('click', '.hello', hello);
$(document).off('click', '.hello', hello);
```

<a name="trigger"></a>
#### `.trigger()`

Example:

```js
let data = {
    hello: 'hello',
};
$(document).on('hello', function (event) {
    console.log(event.detail); // { hello: "hello" }
});
$(document).trigger('hello', data);
```

<a name="ajax"></a>
#### `.ajax()`

Example:

```js
$.ajax({
    type: 'GET',
    url: 'http://api.hello.com', // http://api.hello.com/?hello=hello&world=world
    data: {
        hello: 'hello',
        world: 'world',
    },
    success: function (data) {
        console.log(data);
    },
    error: function (error) {
        console.error(error);
    },
});
```

<a name="width"></a>
#### `.width()`

Example:

```js
$(window).width()
$(document).width()
$('body').width()
```

<a name="height"></a>
#### `.height()`

Example:

```js
$(window).height()
$(document).height()
$('body').height()
```
