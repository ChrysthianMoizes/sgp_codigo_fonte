const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/api',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
