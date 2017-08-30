import webpackDevMiddleware from 'webpack-dev-middleware';

export default function (compiler, publicPath) {
  const webpackDevMiddlewareOptions = {
    publicPath,
    stats: {
      colors: true,
      chunks: false,
      chunkModules: false,
    },
    hot: true,
    lazy: false,
    historyApiFallback: true,
  };

  return webpackDevMiddleware(compiler, webpackDevMiddlewareOptions);
}
