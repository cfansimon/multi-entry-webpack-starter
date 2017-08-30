'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _yargs=require('yargs');var _path=require('path');var _path2=_interopRequireDefault(_path);var _util=require('./util');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var parameters=require(_path2.default.resolve(_yargs.argv.parameters)).default;/**
 * 处理路径相关都在config里面完成
 */var specialArgv={};_yargs.argv._.forEach(function(arg){if(arg.indexOf(':')>0){var argArr=arg.split(':');specialArgv[argArr[0]]=argArr[1];}});var port=specialArgv.port||3030;var debugMode=!!_yargs.argv.debugMode;var rootDir=_path2.default.resolve('./');var globalAssetsDir=_path2.default.resolve(rootDir,parameters.paths.globalAssets);var libsDir=_path2.default.resolve(rootDir,parameters.paths.libs);var nodeModulesDir=_path2.default.resolve(rootDir,'node_modules');var libsOutput='libs';var assetsSrcDirs=[rootDir,globalAssetsDir];var bundleEntry={};for(var key in parameters.bundlesEntry){bundleEntry[key]={};bundleEntry[key][key]=parameters.bundlesEntry[key]['entry'];var chunksPath=parameters.bundlesEntry[key]['chunksPath'];var chunksFilter=parameters.bundlesEntry[key].hasOwnProperty('chunksFilter')?parameters.bundlesEntry[key]['chunksFilter']:'/**/*.{js,jsx}';Object.assign(bundleEntry[key],(0,_util.searchEntries)(chunksPath,chunksFilter,key+'/'));}/**
 * //bundleEntry after process 
 * {
 *    app: {
 *      app: '/src/AppBundle/Resources/assets/app.js',
 *      'app/default/index': '/src/AppBundle/Resources/assets/js/default/index.js',
 *      ...
 *    },
 *    admin: {
 *      admin: '/src/AppBundle/Resources/assets/admin.js',
 *      'admin/default/index': '/src/AdminBundle/Resources/assets/js/default/index.js',
 *      ...
 *    },
 * };
 */var libEntry={};//convert relative path to absolute path if it's a js file
var _loop=function _loop(_key){libEntry[libsOutput+'/'+_key]=[];parameters.libs[_key].forEach(function(le){if(le.indexOf('.js')>0){libEntry[libsOutput+'/'+_key].push(_path2.default.resolve(libsDir,le));}else{libEntry[libsOutput+'/'+_key].push(le);}});};for(var _key in parameters.libs){_loop(_key);}var copyWebpackPluginItems=[];if(parameters.pureCopy){parameters.pureCopy.forEach(function(item){copyWebpackPluginItems.push({from:nodeModulesDir+'/'+item.from,to:libsOutput+'/'+item.to,ignore:item.ignore,copyUnmodified:true,force:true});});}var config={// Environment
__DEBUG__:debugMode,__DEV__:process.env.NODE_ENV==='development',__DEV_SERVER_PORT__:port,// Dir
assetsSrcDirs:assetsSrcDirs,libsDir:libsDir,nodeModulesDir:nodeModulesDir,// Webpack
bundleEntry:bundleEntry,libEntry:libEntry,libsOutput:libsOutput,output:{path:_path2.default.resolve(rootDir,parameters.paths.output),publicPath:parameters.paths.publicPath},noParseDeps:parameters.noParseDeps||[],copyWebpackPluginItems:copyWebpackPluginItems};exports.default=config;