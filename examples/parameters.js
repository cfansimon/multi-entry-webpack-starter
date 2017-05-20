/**
 * This file is a template of what your parameters.js file should look like.
 * This file is also a example for symfony2 apps, put it into app/Resources/assets/config/parameters.js.
 */

 const parameters = {
   paths: {
     globalAssets: 'app/Resources/assets/',
     happypackTempDir: 'app/cache/dev/',
     libs: 'app/Resources/assets/libs/',
     output: 'web/static/', //webpack file output path
     publicPath: '/static/',  //relative to website domain
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
     mobile: {
       entry: 'src/MobileBundle/Resources/assets/mobile.js',
       chunksPath: 'src/MobileBundle/Resources/assets/js/',
     },
   },
   libs: { // path realtive to globalAssets path
     'vendor': ['vendor.js'], //can be a js file
     'fix-ie': ['html5shiv', 'respond-js'],
     'jquery-validation': ['js/jquery-validation.js'],
     'jquery-form': ['jquery-form'],
     'jquery-fancybox': ['jquery-plugins/jquery-fancybox/jquery-fancybox.js'],
     'jquery-treegrid': ['jquery-plugins/jquery-treegrid/jquery-treegrid.js'],
     'select2': ['jquery-plugins/select2/select2.js'],
     'bootstrap-datetime-picker': ['jquery-plugins/bootstrap-datetime-picker/bootstrap-datetime-picker.js'],
   },
   noParseDeps: [ //these node modules will use a dist version to speed up compilation
     'jquery/dist/jquery.js',
     'bootstrap/dist/js/bootstrap.js',
     'admin-lte/dist/js/app.js',
     'jquery-validation/dist/jquery.validate.js',
     'jquery-form/jquery.form.js',
     'fancybox/dist/js/jquery.fancybox.js',
     'bootstrap-notify/bootstrap-notify.js',
     // The `.` will auto be replaced to `-` for compatibility 
     'respond.js/dest/respond.src.js',
     'jquery-slimscroll/jquery.slimscroll.js',
     'bootstrap-datetime-picker/js/bootstrap-datetimepicker.js',
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