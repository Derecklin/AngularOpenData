//此設定讓 Angular 開發時呼叫 / api / weather 時，不會直接對外，而是導向 ASP.NET Core 的後端 https://localhost:7224/api/weather，避免跨域（CORS）問題。
//必須確保：angular.json 的 serve.options.proxyConfig 指向此檔案
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7224';

const PROXY_CONFIG = [
  {
    context: [
      "/api/weather" , // 代理這個路徑
/*      "/weatherforecast",*/
    ],
    target,
    secure: false
  }
]

module.exports = PROXY_CONFIG;
