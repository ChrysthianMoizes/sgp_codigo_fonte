import { environment } from './src/environments/environment';

const proxy = [
  {
    context: ['/api'],
    target: environment.apiUrl,
    secure: false,
    logLevel: 'debug',
    pathRewrite: { '^/api': `${environment.apiUrl}/api` }
  }
];

module.exports = proxy;
