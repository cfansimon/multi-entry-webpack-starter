import appConfig from '../config';
import express from 'express';
import webpack from 'webpack';
import serveIndex from 'serve-index';
import cors from 'cors';

import logger from './logger';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackConfig from './webpack.config';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, webpackConfig.output.publicPath));
app.use(webpackConfig.output.publicPath, serveIndex(webpackConfig.output.path, {'icons': true}));
app.use(cors());

app.listen(appConfig.__DEV_SERVER_PORT__, '0.0.0.0', () => {
  logger.info(`Express server listening on ${appConfig.__DEV_SERVER_PORT__} in ${app.settings.env} node`);
});
