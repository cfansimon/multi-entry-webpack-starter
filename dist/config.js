'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _yargs=require('yargs');var _path=require('path');var _path2=_interopRequireDefault(_path);var _util=require('./util');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var parameters=require(_path2.default.resolve(_yargs.argv.parameters)).default;var specialArgv={};_yargs.argv._.forEach(function(arg){if(arg.indexOf(':')>0){var argArr=arg.split(':');specialArgv[argArr[0]]=argArr[1];}});var port=specialArgv.port||3030;var debugMode=!!_yargs.argv.debugMode;var rootDir=_path2.default.resolve('./');var globalAssetsDir=_path2.default.resolve(rootDir,parameters.paths.globalAssets);var libsDir=_path2.default.resolve(rootDir,parameters.paths.libs);var nodeModulesDir=_path2.default.resolve(rootDir,'node_modules');var assetsSrcDirs=[rootDir,globalAssetsDir];var bundleEntry={};for(var key in parameters.bundlesEntry){bundleEntry[key]={};bundleEntry[key][key]=parameters.bundlesEntry[key]['entry'];Object.assign(bundleEntry[key],(0,_util.searchEntries)(parameters.bundlesEntry[key]['chunksPath'],key+'/'));}var libEntry={};var libEntryPrefix='libs/';var _loop=function _loop(_key){libEntry[''+libEntryPrefix+_key]=[];parameters.libs[_key].forEach(function(le){if(le.indexOf('.js')>0){libEntry[''+libEntryPrefix+_key].push(_path2.default.resolve(libsDir,le));}else{libEntry[''+libEntryPrefix+_key].push(le);}});};for(var _key in parameters.libs){_loop(_key);}var config={__DEBUG__:debugMode,__DEV__:process.env.NODE_ENV==='development',__DEV_SERVER_PORT__:port,assetsSrcDirs:assetsSrcDirs,libsDir:libsDir,nodeModulesDir:nodeModulesDir,bundleEntry:bundleEntry,libEntry:libEntry,output:{path:_path2.default.resolve(rootDir,parameters.paths.output),publicPath:parameters.paths.publicPath},noParseDeps:parameters.noParseDeps||[],happypack:{tempDir:parameters.paths.happypackTempDir||_path2.default.resolve(rootDir,'.happypack/')}};exports.default=config;