const express = require('express');
const proxy = require('express-http-proxy');
const ejs = require('ejs');
const path = require('path');
const config = require('./config/config.json');

const app = express();
const appPort = 48001;
// const appPort = 4000;
// appName/requestType
const appBasApi = `${config.basHost}/${config.basReqType}/${config.basApp}`;
const appCasApi = `${config.casHost}/${config.casReqType}/${config.casApp}`;
const appMmsApi = `${config.mmsHost}/${config.mmsReqType}/${config.mmsApp}`;
const appOmsApi = `${config.omsHost}/${config.omsReqType}/${config.omsApp}`;
const appPmsApi = `${config.pmsHost}/${config.pmsReqType}/${config.pmsApp}`;
const appSmsApi = `${config.smsHost}/${config.smsReqType}/${config.smsApp}`;
const appTmsApi = `${config.tmsHost}/${config.tmsReqType}/${config.tmsApp}`;

const appDubboApi = `${config.dubboHost}/${config.dubboApp}`;
const workFlowApi = `${config.wfHost}/${config.wfReqType}/${config.wfApp}`;
const appXxlJobApi = `${config.xxlJobHost}/${config.xxlJobReqType}/${config.xxlJobApp}`;

const bmsApi = `${config.bmsHost}/${config.bmsReqType}/${config.bmsApp}`;

if (config.basProxy !== '') {
  const basProxy = proxy(config.basProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.basProxyApp}${req._parsedUrl.path}`);
      return `${config.basProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appBasApi}/*`, basProxy);
}

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

if (config.mmsProxy !== '') {
  const mmsProxy = proxy(config.mmsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.proxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appMmsApi}/*`, mmsProxy);
  // extra request to mmsProxy
  const defaultUploadProxy = proxy(config.mmsProxy, {
    reqBodyEncoding: null,
    forwardPath: (req) => {
      console.log('default upload request');
      return `${config.proxyApp}${req._parsedUrl.path}`;
    },
  });

  app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
}

if (config.omsProxy !== '') {
  const omsProxy = proxy(config.omsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.omsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appOmsApi}/*`, omsProxy);
}



if (config.dubboProxy !== '') {
  const dubboProxy = proxy(config.dubboProxy, {
    forwardPath: (req) => {
      console.log('auth request method ==> ', req.method);
      return req._parsedUrl.path;
    },
  });
  app.use(`${appDubboApi}/*`, dubboProxy);
  app.use('/dubbo-admin/governance/getAllServices.do', dubboProxy);
}

if (config.xxlJobProxy !== '') {
  const xxlJobProxy = proxy(config.xxlJobProxy, {
    forwardPath: (req) => {
      return `${config.xxlJobProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appXxlJobApi}/*`, xxlJobProxy);
}

if (config.wfProxy !== '') {
  const wfProxy = proxy(config.wfProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.wfProxyApp}${req._parsedUrl.path}`);
      return `${config.wfProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${workFlowApi}/*`, wfProxy);
}

const defaultUploadProxy = proxy(config.basProxy, {
  reqBodyEncoding: null,
  forwardPath: (req) => {
    console.log('default upload request');
    return `${config.basProxyApp}${req._parsedUrl.path}`;
  },
});
app.use('/attachment/commonFileUpload.do', defaultUploadProxy);

if (config.bmsProxy !== '') {
  const bmsProxy = proxy(config.bmsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.bmsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${bmsApi}/*`, bmsProxy);
}

if (config.pmsProxy !== '') {
  const pmsProxy = proxy(config.pmsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.pmsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appPmsApi}/*`, pmsProxy);
  // extra request to tmsProxy
  const defaultUploadProxy = proxy(config.pmsProxy, {
    reqBodyEncoding: null,
    forwardPath: (req) => {
      console.log('default upload request');
      return `${config.pmsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
}

if (config.smsProxy !== '') {
  const smsProxy = proxy(config.smsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method, `${config.smsProxyApp}${req._parsedUrl.path}`);
      return `${config.smsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appSmsApi}/*`, smsProxy);
  // add extra request to tmsProxy
  // const defaultUploadProxy = proxy(config.pmsProxy, {
  //   reqBodyEncoding: null,
  //   forwardPath: (req) => {
  //     console.log('default upload request');
  //     return `${config.pmsProxyApp}${req._parsedUrl.path}`;
  //   },
  // });
  // app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
}

if (config.tmsProxy !== '') {
  const tmsProxy = proxy(config.tmsProxy, {
    forwardPath: (req) => {
      console.log('default request method ==> ', req.method);
      return `${config.tmsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use(`${appTmsApi}/*`, tmsProxy);
  // extra request to tmsProxy
  const defaultUploadProxy = proxy(config.tmsProxy, {
    reqBodyEncoding: null,
    forwardPath: (req) => {
      console.log('default upload request');
      return `${config.tmsProxyApp}${req._parsedUrl.path}`;
    },
  });
  app.use('/attachment/commonFileUpload.do', defaultUploadProxy);
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
