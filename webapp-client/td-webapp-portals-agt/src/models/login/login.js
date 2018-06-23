import { routerRedux } from 'dva/router';
import * as service from '../../services/login';
import { parseResponse } from '../../utils/request';
import { callNotice } from '../../utils/alert';
import { encode } from '../../utils/code';
import { checkLoginName, getLoginType } from '../../utils/vaild';
import { setSession, setToken, setCookie } from '../../utils/storage';
import * as i18n from '../../utils/i18n';
import * as indexServices from '../../services/indexPage';
import Config from '../../../config/config.json';

const commonMap = i18n.commonMap();
const validMap = i18n.bizMap('vaild');
/**
 * 解析token
 */
// const parseToken = (url) => {
//   const key = '?k=';
//   const idx = url.indexOf(key);
//   let param = null;
//   if (idx !== -1) {
//     let str = '';
//     const nurl = url.substring(idx);
//     const idx2 = nurl.indexOf('&');
//     str = nurl.substring(key.length, idx2 === -1 ? url.length : idx2);
//     param = (str !== '' ? decode(str, 'base64', true) : '');  // should url safe
//     const p = (param !== '' ? qs.parse(param) : {});
//     setToken(p.user, p.tk);
//     return p;
//   }
//   return param;
// }

export default {
  namespace: 'login',
  state: {
    loginVisible: false,
    loginLoading: false,
    username: '',
  },
  // 订阅
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     history.listen((location) => {
  //       if (location.pathname === '/') {
  // dispatch({
  //   type: 'updateState',
  //   payload: { breadPath: [commonMap.home] },
  // });
  //       }
  //     });
  //   },
  // },

  effects: {
    * login({ payload }, { call, put }) {
      if (checkLoginName(payload.username)) {
        yield put({
          type: 'updateState',
          payload: { loginLoading: true },
        });
        const param = {
          usrName: payload.username,
          usrPsw: encode(payload.password, 'md5'),
          loginType: getLoginType(payload.username),
        }
        const res = yield call(service.login, param);
        const detail = parseResponse(res);
        console.log(1111111111111)
        //登录时返回的参数200代表成功  参数值放在rspData
        if (detail.rspCod === '200') {
          const token = detail.rspData.token;
          setToken(payload.username, token);
          setCookie('agtName', detail.rspData.agtName !== null ? detail.rspData.agtName : '');
          setCookie('logo', detail.rspData.agtLogo !== null ? detail.rspData.agtLogo : '');
          setCookie('agtId', detail.rspData.agtId !== null ? detail.rspData.agtId : '');
          const sres = yield call(indexServices.querySysMenu, {
            token: token, language: Config.language,
          });
          const details = parseResponse(sres);
          if (details.rspCod === '200') {
            yield put({
              type: 'indexPage/updateState',
              payload: {
                menuItems: details.rspData.usrLoginAuthList,
              },
            });
          } else {
            callNotice(commonMap.fail, details.rspMsg || commonMap.failLogin, 'error');
          }

          yield put((routerRedux.push('/home')));
          yield put({
            type: 'updateState',
            payload: { loginLoading: false, loginVisible: false },
          });
        } else {
          yield put({
            type: 'updateState',
            payload: { loginLoading: false },
          });
          callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
        }
      } else {
        callNotice(commonMap.username, validMap.validIsCorrectLoginName, 'error');
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
