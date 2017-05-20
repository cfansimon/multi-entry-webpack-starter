'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _winston=require('winston');var _winston2=_interopRequireDefault(_winston);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var config={levels:{error:0,debug:1,warn:2,data:3,info:4,verbose:5,silly:6},colors:{error:'bold red',debug:'bold blue',warn:'bold yellow',data:'bold grey',info:'bold green',verbose:'bold cyan',silly:'bold magenta'}};// https://github.com/winstonjs/winston/blob/master/examples/custom-levels.js
var logger=new _winston2.default.Logger({transports:[new _winston2.default.transports.Console({colorize:'all'})],levels:config.levels,colors:config.colors});// logger.silly('silly');
// logger.verbose('verbose');
// logger.data('data');
// logger.debug('debug');
// logger.info('info');
// logger.warn('warn');
// logger.error('error');
exports.default=logger;