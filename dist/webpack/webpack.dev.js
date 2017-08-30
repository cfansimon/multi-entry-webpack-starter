'use strict';var _config=require('../config');var _config2=_interopRequireDefault(_config);var _express=require('express');var _express2=_interopRequireDefault(_express);var _webpack=require('webpack');var _webpack2=_interopRequireDefault(_webpack);var _serveIndex=require('serve-index');var _serveIndex2=_interopRequireDefault(_serveIndex);var _cors=require('cors');var _cors2=_interopRequireDefault(_cors);var _logger=require('./logger');var _logger2=_interopRequireDefault(_logger);var _webpackDev=require('./middleware/webpack-dev');var _webpackDev2=_interopRequireDefault(_webpackDev);var _webpack3=require('./webpack.config');var _webpack4=_interopRequireDefault(_webpack3);var _copyWebpackPlugin=require('copy-webpack-plugin');var _copyWebpackPlugin2=_interopRequireDefault(_copyWebpackPlugin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var copyCompiler=(0,_webpack2.default)({entry:{'empty':'./middleware/empty.js'},output:_config2.default.output,plugins:[new _copyWebpackPlugin2.default(_config2.default.copyWebpackPluginItems)]});copyCompiler.run(function(err,stats){});var app=(0,_express2.default)();var compiler=(0,_webpack2.default)(_webpack4.default);app.use((0,_webpackDev2.default)(compiler,_webpack4.default.output.publicPath));app.use(_webpack4.default.output.publicPath,(0,_serveIndex2.default)(_webpack4.default.output.path,{'icons':true}));app.use((0,_cors2.default)());app.listen(_config2.default.__DEV_SERVER_PORT__,'0.0.0.0',function(){_logger2.default.info('Express server listening on '+_config2.default.__DEV_SERVER_PORT__+' in '+app.settings.env+' node');});