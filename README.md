# multi-entry-webpack-starter

make multi-page webapps easy to start with webpack

## Guide

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
|  |-AppBundle/Resources/assets
|  |  |-js
|  |  |  |-app
|  |  |  |  |-user
|  |  |  |  |  |-index.js
|  |  |-app.js
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
    libs: 'app/Resources/assets/libs/',
    output: 'web/static/', //webpack file output path
    publicPath: '/static/', //relative to website domain
  },
  bundlesEntry: { //register entry and its chunks
    app: {
      entry: 'src/AppBundle/Resources/assets/app.js',
      chunksPath: 'src/AppBundle/Resources/assets/js/app/',
    },
    admin: {
      entry: 'src/AppBundle/Resources/assets/admin.js',
      chunksPath: 'src/AppBundle/Resources/assets/js/admin/',
    },
    other: {
      entry: 'src/OtherBundle/Resources/assets/other.js',
      chunksPath: 'src/OtherBundle/Resources/assets/js/other/',
    },
  },
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
  pureCopy: [ //pure copy from node_modules to libs output dir
    {
      from: 'ckeditor', //relative to node_modules
      to: 'ckeditor', //relative to libs output dir
      ignore: [
        'samples/**',
        'lang/!(zh-cn.js)',
        '.github/**',
        'adapters/**',
        '.npminstall.done',
        '*.md',
        '*.json',
      ]
    },
    {
      from: 'weui.js/dist/weui.min.js',
      to: 'weui.js',
    },
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