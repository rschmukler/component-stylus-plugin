# Component Stylus Plugin

Plugin for [component/builder](http://github.com/component/builder.js) to enable the direct use of stylus with components.


## Usage Example

    var Builder  = require('component-builder'),
    stylusPlugin = require('component-stylus-plugin');

    var builder = new Builder('.');
    builder.copyAssetsTo('public');
    builder.use(stylusPlugin);

    builder.build(function(err, res) {
      write('public/app.js', res.require + res.js);
      write('public/app.css', res.css);
    });

## Options

Component Stylus Plugin is highly customizable and exhibits a lot of the options that stylus itself has.

### Compression (default false)

Minfies the output of the stylus files that are being compiled

    stylusPlugin.compress = false

### Line Numbers (default true)

Adds line numbers as comments to the CSS being output. Very helpful for debugging.

    stylusPlugin.linenos = true

### Firebug Support (default false)

Adds support for Firebug's Stylus plugin for Firefox

    stylusPlugin.firebug = false

### Imports (default empty)

Allows you to import stylus files into your stylus files before compiling. Useful for custom mixins or global
variable definitions. You must provide a full path to the files.

    stylusPlugin.imports = [__dirname + '/../globals/variableDefinitions.styl',
                            __dirname + '/../globals/customMixins.styl']

If you don't want to have to define imported files in the `stylusPlugin.imports` option, it is possible to import stylus file from a component using `@import "componentName/fileName"`

For instance:
```
{
  ...
  "local": [
    "base-styles"
  ],
}
```

```
@import "base-styles/animation-mixin";

.foo {
  animation();
  position: relative;
}
```

There is an example in the [tests](https://github.com/rschmukler/component-stylus-plugin/tree/master/test/fixtures/with-import).

**However, you must be careful to not import files containing CSS properties, otherwise they will be duplicated in the output.**
Only import files containing variables, placeholder selectors, functions or mixins.

### Include CSS (default false)

Allow `@import` statements to load up regular CSS.

    stylusPlugin.includeCSS = false

### Paths (default empty)

Add additional paths to be searched for `@import` statements

    stylusPlugin.paths = [__dirname + '/../junkDrawer',
                          __dirname + '/../someOtherPlace']

### Plugins (default empty)

Load up any additional plugins that you want to use.

    var nib = require('nib')();

    stylusPlugin.plugins.push(nib);
