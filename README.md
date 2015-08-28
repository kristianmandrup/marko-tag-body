marko-dynamic-tag
=================

Installation
============

```
npm install marko-dynamic-tag --save
```

### Requirements

Currently requires this [marko fork](https://github.com/kristianmandrup/marko/tree/tag-name-transform-hook).

A PR has been submitted to enable a few required hooks ;)

Usage
=====

The magic is in the special tag: `tag-name` which can be set to an expression that will dynamically, runtime replace the tag name!!

```xml
<dynamic-tag tag-name='h$data.lv' class='ui header'>hello world</dynamic-tag>
```

NOTE: If the value of the `tag-body` is left blank then it will default to `data.renderBody`.

```javascript
template.renderSync({
        lv: '1'
    });
```

Output:

```html
<h1 class='ui header'>hello world</h1>
```

```javascript
template.renderSync({
        renderBody: function(out) {
            out.write('My body content')
        }
    });
```

Output:

```html
<div>
    <h1>Hello World</h1>
    <p>
        My body content
    </p>
</div>
```
