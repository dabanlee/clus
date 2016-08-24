# Clus - A minimalist JavaScript library to modify DOM element for modern browsers.

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

### Instance methods

- `<a href="#ready">ready()</a>`
- `<a href="#add-class">addClass</a>`
- `<a href="#remove-class">removeClass</a>`
- `<a href="#has-class">hasClass</a>`
- `<a href="#toggle-class">toggleClass</a>`

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
#### `.addClass(clasNname)`

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Clus</title>
    <script src="/path/to/clus.min.js"></script>
</head>
<body>
    <p class="hello"></p>
    <p></p>
    <script>
    $('.hello').addClass('world');
    $('p').addClass('hello world');
    // or
    $('p').addClass('hello').addClass('world');
    </script>
</body>
</html>
```

<a name="remove-class"></a>
#### `.removeClass(clasNname)`

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Clus</title>
    <script src="/path/to/clus.min.js"></script>
</head>
<body>
    <p class="hello world"></p>
    <p></p>
    <script>
    $('.hello').removeClass('hello').addClass('hi');
    $('p').addClass('hello world').removeClass('hello world');
    // or
    $('p').addClass('hello world').removeClass('hello').removeClass('world');
    </script>
</body>
</html>
```

<a name="has-class"></a>
#### `.hasClass(clasNname)`

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Clus</title>
    <script src="/path/to/clus.min.js"></script>
</head>
<body>
    <p class="hello"></p>
    <script>
    $('p').hasClass('hello'); // true
    $('p').hasClass('world'); // false
    </script>
</body>
</html>
```

<a name="toggle-class"></a>
#### `.toggleClass(clasNname)`

Example:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Clus</title>
    <script src="/path/to/clus.min.js"></script>
</head>
<body>
    <p class="hello"></p>
    <script>
    $('p').toggleClass('hello');
    </script>
</body>
</html>
```
