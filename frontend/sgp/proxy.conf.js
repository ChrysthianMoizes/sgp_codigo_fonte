const proxy = [{
  context: ['/api'],
  target: 'http://backend:8080/',
  secure: false,
  logLevel: 'debug',
  pathRewrite: { '^/api': 'http://backend:8080/api' }
}];

module.exports = proxy;