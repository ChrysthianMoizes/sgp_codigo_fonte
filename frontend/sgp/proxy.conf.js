const proxy = [
  {
    context: ['/api'],
    target: 'http://172.18.0.1:8080/',
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': 'http://172.18.0.1:8080/api' }
  }
];

module.exports = proxy;
