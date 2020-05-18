const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': 'http://localhost:8080/api' }
  }
];

module.exports = proxy;
