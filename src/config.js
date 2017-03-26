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
const bundlesDir = path.resolve(rootDir, parameters.paths.bundles);
const nodeModulesDir = path.resolve(rootDir, 'node_modules');

let assetsSrcDirs = [globalAssetsDir];
let bundleEntry = {};
  /**
   * let bundleEntry = {
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
parameters.bundles.forEach((bundle) => {
  const bundleAssetsDir = `${bundlesDir}/${bundle}/Resources/assets`;

  const bundleName = bundle.replace('Bundle', '').toLowerCase();
  bundleEntry[bundleName] = {};
  bundleEntry[bundleName][bundleName] = `${bundleAssetsDir}/${bundleName}.js`;
  Object.assign(bundleEntry[bundleName], searchEntries(`${bundleAssetsDir}/js`, `${bundleName}/`));

  assetsSrcDirs.push(bundleAssetsDir);
});

let libEntry = {};
let libEntryPrefix = 'libs/';
//convert relative path to absolute path if it's a js file
for (let key in parameters.libs) {
  libEntry[`${libEntryPrefix}${key}`] = [];
  parameters.libs[key].forEach((le) => {
    if (le.indexOf('.js') > 0) {
      libEntry[`${libEntryPrefix}${key}`].push(path.resolve(libsDir, le));
    } else {
      libEntry[`${libEntryPrefix}${key}`].push(le);
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
  output: {
    path : path.resolve(rootDir, parameters.paths.output),
    publicPath: parameters.paths.publicPath,
  },
  noParseDeps: parameters.noParseDeps || [],
  happypack: {
    tempDir: parameters.paths.happypackTempDir || path.resolve(rootDir, '.happypack/'),
  },
};

export default config;
