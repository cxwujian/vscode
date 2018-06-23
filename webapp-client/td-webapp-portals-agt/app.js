const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const appPort = 49012;
// appName/mmsReqType
const agtpApi = `${config.agtpHost}/${config.agtpReqType}/${config.agtpApp}`;


if (config.agtpProxy !== '') {
  const agtpProxy = proxy(config.agtpProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.agtpProxyApp}${req._parsedUrl.path}`);
      return `${config.agtpProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${agtpApi}/*`, agtpProxy);
  // app.use('/attachment/commonFileUpload.do', agtpProxy);
  app.use(`${agtpApi}/common/upload`, agtpProxy);
}

app.use(express.static(path.join(__dirname, 'dist')));
//use ejs engine for html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// access static page (tb mng system will implement these functions below)
// app.get('/p/wx/bind', (req, res) => {
//   res.sendFile(path.join(__dirname, 'page/wx_bind_index.html'));
// });
// app.get('/p/wx/bind/init', (req, res) => {
//   const param = req.query;
//   const wxCode = param && param.code ? param.code : '';
//   res.render(path.join(__dirname, 'page/wx_bind_init'), { wxCode });
// });

app.listen(appPort);
console.log(`Now server listening at ${appPort}`);
