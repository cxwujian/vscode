import dva from 'dva';
import es6Promise from 'es6-promise';
import { encode, decode } from './utils/code';
import Config from '../config/config.json';
import './index.html';
import './index.css';

// -1. Get init state
const initStateName = `_TD_${Config.app}_IDX_S`;
const initStateStr = sessionStorage.getItem(initStateName);
let initState = {};
if (initStateStr !== null) {
  try {
    initState = JSON.parse(decode(initStateStr, 'deflate'));
  } catch (e) { console.log(e); }
}

// 1. Initialize
const app = dva({
  initialState: initState,
  // handle exception from effects and subscriptions
  onError(e) {
    console.log('error =>', e.message);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login/login'));
app.model(require('./models/login/loginPwdBack'));
app.model(require('./models/indexPage'));
app.model(require('./models/home'));
app.model(require('./models/home1'));
app.model(require('./models/home2'));
app.model(require('./models/home3'));
app.model(require('./models/merp/merchantStoreApply'));
app.model(require('./models/merp/merchantStoreManage'));
app.model(require('./models/merp/merchantStoreUsrManage'));
app.model(require('./models/merp/taskStoreManage'));

app.model(require('./models/merp/merchantTerminalManage'));
app.model(require('./models/merp/merStlManage'));
app.model(require('./models/merp/merStlWithdraw'));

app.model(require('./models/merp/summaryOrderManage'));
app.model(require('./models/merp/summaryHisOrderManage'));
app.model(require('./models/merp/bankcardOrderManage'));
app.model(require('./models/merp/bankcardHisOrderManage'));
app.model(require('./models/merp/scanOrderManage'));
app.model(require('./models/merp/scanHisOrderManage'));

app.model(require('./models/merp/pwdService'));
app.model(require('./models/merp/merInf'));


// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

// 6. other setting
window.addEventListener('beforeunload', () => {
  // when browser refresh, keep special state (like: breadcrumb)
  const keepState = app._store.getState().indexPage;
  if (typeof keepState === 'object') {
    const state = {
      indexPage: keepState,
    }
    sessionStorage.removeItem(initStateName);
    sessionStorage.setItem(initStateName, encode(JSON.stringify(state), 'deflate'));
  }
});
