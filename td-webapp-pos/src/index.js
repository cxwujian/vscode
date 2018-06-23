import dva from 'dva';
import { encode, decode } from './utils/code';
import Config from '../config/config.json';
import './index.html';
import './index.css';

import { addBasModel } from './index-bas';
import { addBmsModel } from './index-bms';
import { addCasModel } from './index-cas';
import { addMmsModel } from './index-mms';
import { addOmsModel } from './index-oms';
import { addPmsModel } from './index-pms';
import { addRmsModel } from './index-rms';
import { addSmsModel } from './index-sms';
import { addTmsModel } from './index-tms';

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
app.model(require('./models/indexPage'));
app.model(require('./models/home'));
// bas models
addBasModel(app);
// bs models
addBmsModel(app);
// cas models
addCasModel(app);
// mms models
addMmsModel(app);
// oms models
addOmsModel(app);
// pms models
addPmsModel(app);
// rms models
addRmsModel(app);
// sms models
addSmsModel(app);
// tms models
addTmsModel(app);

// demo models
app.model(require('./models/demo/productManage'));

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
