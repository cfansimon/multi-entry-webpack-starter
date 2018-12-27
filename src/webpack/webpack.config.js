import appConfig  from '../config';
import webpack from 'webpack';
import path from 'path';
import os from 'os';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HappyPack from 'happypack';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const __DEBUG__ = appConfig.__DEBUG__;
const __DEV__ = appConfig.__DEV__;
const output = appConfig.output;
const bundleEntry = appConfig.bundleEntry;
const libEntry = appConfig.libEntry;
const copyWebpackPluginItems = appConfig.copyWebpackPluginItems;
const noParseDeps = appConfig.noParseDeps;
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

const assetsSrcDirs = appConfig.assetsSrcDirs;
const libsDir = appConfig.libsDir;
const nodeModulesDir = appConfig.nodeModulesDir;

const isNeedCompress = !__DEBUG__ && !__DEV__;

let entries = libEntry;
let webpackPlugins = [];

const bundleEntryKeys = Object.keys(bundleEntry);
bundleEntryKeys.forEach((key) => {
  Object.assign(entries, bundleEntry[key]);
  webpackPlugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: key,
    filename: '[name].js',
    chunks: Object.keys(bundleEntry[key]),
    minChunks: 2,
  }));
});

if (!__DEV__ && copyWebpackPluginItems.length > 0) {
  webpackPlugins.push(new CopyWebpackPlugin(copyWebpackPluginItems));
}

let config = {
  entry: entries,
  output: Object.assign(output, {
    filename: '[name].js',
  }),
  resolve: {
    modules: assetsSrcDirs,
    alias: {
      libs: libsDir,
      nodeModulesDir: nodeModulesDir,
    },
    extensions: ['*', '.js', '.jsx'],
  },
  module: {
    noParse: [],
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'happypack/loader',
        include: assetsSrcDirs,
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              minimize: isNeedCompress ? true : false
            }
          }],
        }),
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: isNeedCompress ? true : false
              }
            },{
              loader: 'less-loader'
            }
          ]
        }),
      }, {
        test: /\.(png|jpe?g|gif)$/,
        loader: 'file-loader?name=img/[name].[ext]',
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
      }],
  },
  plugins: [
    new HappyPack({
      threadPool: happyThreadPool,
      loaders: ['babel-loader'],
    }),

    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      __DEBUG__: __DEBUG__,
      __DEV__: __DEV__,
    }),

  ].concat(webpackPlugins),
};

noParseDeps.forEach(dep => {
  // add the specific deps to noParse and alias
  const depPath = path.resolve(nodeModulesDir, dep);
  config.resolve.alias[dep.split(path.sep)[0].replace('.', '-')] = depPath;
  config.module.noParse.push(depPath);

});

config.module.rules.push({
  test: new RegExp(`(${noParseDeps.join('|')})$`),
  loader: 'imports-loader?define=>false&module=>false&exports=>false&this=>window',
});


if (isNeedCompress) { //do not compress code in debug mode
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true,
      sequences: true,
      dead_code: true,
      drop_debugger: true,
      comparisons: true,
      conditionals: true,
      evaluate: true,
      booleans: true,
      loops: true,
      unused: true,
      hoist_funs: true,
      if_return: true,
      join_vars: true,
      cascade: true,
      drop_console: true,
    },
    output: {
      comments: false,
    },
  }));
}

export default config;
