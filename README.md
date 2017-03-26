# multi-entry-webpack-starter

make multi-page webapps easy to start with webpack

## Dev Guide

### Setup

1. Setup your package.json, see examples/package.json
2. Setup your parameters.js, see examples/parameters.js

### Example of Symfony2 webapp

#### structure

```
project
|-app
|  |-Resources
|  |  |-assets
|  |  |  |-common
|  |  |  |  |-script.js
|  |  |  |-config
|  |  |  |  |-parameters.js
|  |  |  |-libs
|  |  |  |  |-jquery-plugins
|  |  |  |  |-less
|  |  |  |  |-js
|  |  |  |  |-vendor.js
|  |  |  |  |-vendor.less
|-src
|-web
|  |-static
|  |  |-libs
|  |  |  |-jquery-validation
|  |  |  |-vendor.js
|  |  |  |-vendor.css
```

#### parameters.js

```javascript
/**
 * This file is a template of what your parameters.js file should look like.
 * This file is also a example for symfony2 apps, put it into app/Resources/assets/config/parameters.js.
 */

const parameters = {
  paths: {
    globalAssets: 'app/Resources/assets/', //global assets dir
    happypackTempDir: 'app/cache/dev/',
    bundles: 'src/', //Symfony2 bundles dir, to be refactor for decoupling
    libs: 'app/Resources/assets/libs/',
    output: 'web/static/', //webpack file output path
    publicPath: '/static/', //relative to website domain
  },
  bundles: [ //register Symfony2 bundles, to be refactor for decoupling
    'AppBundle',
  ],
  libs: { // path realtive to globalAssets path, each lib will be compiled into a single file named with the key, like `web/static/libs/vendor.js`, `web/static/libs/fix-ie.js`, and echo lib file must use <scripts src=``web/static/libs/xxx.js`> in the page. This is designed for reducing js contents in each page.
    vendor: ['vendor.js'], //can be a js file
    ckeditor: ['ckeditor'], //or can be a node module name
    'fix-ie': ['html5shiv', 'respond-js'],
    'jquery-validation': ['js/jquery-validation.js'],
    'jquery-form': ['jquery-form'],
    'jquery-treegrid': ['jquery-plugins/jquery-treegrid/jquery-treegrid.js'],
  },
  noParseDeps: [ //These node modules will use a dist version to speed up compilation.
    'jquery/dist/jquery.js',
    'bootstrap/dist/js/bootstrap.js',
    'admin-lte/dist/js/app.js',
    'jquery-validation/dist/jquery.validate.js',
    'jquery-form/jquery.form.js',
    'bootstrap-notify/bootstrap-notify.js',
    // The `.` will auto be replaced to `-` for compatibility 
    'respond.js/dest/respond.src.js',
  ],
};

export default parameters;
```


## Easy Usage

### during develop

```shell
npm run dev
npm run dev port:3038 #change port
```

### compile output

```shell
npm run compile
npm run compile:debug
```