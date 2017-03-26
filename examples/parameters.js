/**
 * This file is a template of what your parameters.js file should look like.
 * This file is also a example for symfony2 apps, put it into app/Resources/assets/config/parameters.js.
 */

const parameters = {
  paths: {
    globalAssets: 'app/Resources/assets/',
    happypackTempDir: 'app/cache/dev/',
    bundles: 'src/',
    libs: 'app/Resources/assets/libs/',
    output: 'web/static/', //webpack file output path
    publicPath: '/static/', //relative to website domain
  },
  bundles: [ //register php bundles
    'AppBundle',
  ],
  libs: { // path realtive to globalAssets path
    vendor: ['vendor.js'], //can be a js file
    ckeditor: ['ckeditor'], //or can be a node module name
    'fix-ie': ['html5shiv', 'respond-js'],
    'jquery-validation': ['js/jquery-validation.js'],
    'jquery-form': ['jquery-form'],
    'jquery-treegrid': ['jquery-plugins/jquery-treegrid/jquery-treegrid.js'],
  },
  noParseDeps: [ //these node modules will use a dist version to speed up compilation
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