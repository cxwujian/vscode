const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const appPort = 4011;
// appName/casReqType

const appBasApi = `${config.basHost}/${config.basReqType}/${config.basApp}`;
const appCasApi = `${config.casHost}/${config.casReqType}/${config.casApp}`;

if (config.casProxy !== '') {
  const casProxy = proxy(config.casProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.casProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appCasApi}/*`, casProxy);
  // extra request to casProxy
  const defaultUploadProxy = proxy(config.casProxy, {
    reqBodyEncoding: null,
    forwardPath: (req) => {
      console.log('default upload request');
      return `${config.casProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
}

if (config.basProxy !== '') {
  const basProxy = proxy(config.basProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.basProxyApp}${req._parsedUrl.path}`);
      return `${config.basProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appBasApi}/*`, basProxy);
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
