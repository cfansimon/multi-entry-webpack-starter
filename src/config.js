/**
 * 处理路径相关都在config里面完成
 */
import { argv } from 'yargs';
import path from 'path';
import { searchEntries } from './util';

let parameters = require(path.resolve(argv.parameters)).default;

let specialArgv = {};
argv._.forEach((arg) => {
  if (arg.indexOf(':') > 0) {
    let argArr = arg.split(':');
    specialArgv[argArr[0]] = argArr[1];
  }
});

let port = specialArgv.port || 3030;
let debugMode = !!argv.debugMode;

const rootDir = path.resolve('./');
const globalAssetsDir = path.resolve(rootDir, parameters.paths.globalAssets);
const libsDir = path.resolve(rootDir, parameters.paths.libs);
const nodeModulesDir = path.resolve(rootDir, 'node_modules');
const libsOutput = 'libs';

let assetsSrcDirs = [rootDir, globalAssetsDir];

let bundleEntry = {};
for (let key in parameters.bundlesEntry) {
  bundleEntry[key] = {};
  bundleEntry[key][key] = parameters.bundlesEntry[key]['entry'];
  Object.assign(bundleEntry[key], searchEntries(parameters.bundlesEntry[key]['chunksPath'], `${key}/`));
}

/**
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
 */

let libEntry = {};
//convert relative path to absolute path if it's a js file
for (let key in parameters.libs) {
  libEntry[`${libsOutput}/${key}`] = [];
  parameters.libs[key].forEach((le) => {
    if (le.indexOf('.js') > 0) {
      libEntry[`${libsOutput}/${key}`].push(path.resolve(libsDir, le));
    } else {
      libEntry[`${libsOutput}/${key}`].push(le);
    }
  });
}

let config = {

  // Environment
  __DEBUG__: debugMode,
  __DEV__: process.env.NODE_ENV === 'development',
  __DEV_SERVER_PORT__: port,

  // Dir
  assetsSrcDirs: assetsSrcDirs,
  libsDir: libsDir,
  nodeModulesDir: nodeModulesDir,

  // Webpack
  bundleEntry: bundleEntry,
  libEntry: libEntry,
  libsOutput: libsOutput,
  output: {
    path : path.resolve(rootDir, parameters.paths.output),
    publicPath: parameters.paths.publicPath,
  },
  noParseDeps: parameters.noParseDeps || [],
  pureCopy: parameters.pureCopy || [],
  happypack: {
    tempDir: parameters.paths.happypackTempDir || path.resolve(rootDir, '.happypack/'),
  },
};

export default config;
