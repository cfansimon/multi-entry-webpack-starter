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
};

export default parameters;