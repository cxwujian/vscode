import qs from 'qs';
import * as service from '../services/indexPage';
import { parseResponse } from '../utils/request';
import { callNotice } from '../utils/alert';
import { encode, decode } from '../utils/code';
import { getCookie, getToken, setToken } from '../utils/storage';
import * as i18n from '../utils/i18n';
import Config from '../../config/config.json';

const commonMap = i18n.commonMap();

const casMenu = [
  {
    key: '000-01',
    icon: 'setting',
    text: '科目管理',
    children: [
      { key: '000-01-01', text: '业务类别维护', to: 'cas/subjectManage/busTypGroupManage' },
      { key: '000-01-02', text: '科目代码维护', to: 'cas/subjectManage/subjectCodeManage' },
      { key: '000-01-03', text: '科目余额表', to: 'cas/subjectManage/subjectDayEndBalManage' },
      { key: '000-01-04', text: '科目体系平衡', to: 'cas/subjectManage/subjectSystemBalance' },
    ],
  },
  {
    key: '000-02',
    icon: 'setting',
    text: '账户管理',
    children: [
      { key: '000-02-01', text: '客户信息管理', to: 'cas/accManage/cusInfManage' },
      { key: '000-02-02', text: '子账户类别维护', to: 'cas/accManage/subAccCategoryManage' },
      { key: '000-02-03', text: '账户维护', to: 'cas/accManage/accProfilesManage' },
      { key: '000-02-04', text: '账户记账管理', to: 'cas/accManage/accManageInfManage' },
      { key: '000-02-05', text: '记账方式维护', to: 'cas/accManage/accModeInfManage' },
      { key: '000-02-06', text: '账户余额核对', to: 'cas/accManage/accDayEndBalManage' },
      { key: '000-02-06', text: '账户总分核对', to: 'cas/accManage/accountCheckManage' },
    ],
  },
  {
    key: '001-03',
    icon: 'setting',
    text: '交易管理',
    children: [
      { key: '000-03-01', text: '基础交易管理', to: 'cas/transManage/transBaseManage' },
      { key: '000-03-02', text: '分录规则管理', to: 'cas/transManage/accEntryRulesInfManage' },
      { key: '000-03-03', text: '外部交易码维护', to: 'cas/transManage/transRelatedExtManage' },
      { key: '000-03-04', text: '渠道代码查询', to: 'cas/transManage/payChnInfManage' },
      { key: '000-03-05', text: '币种维护', to: 'cas/transManage/ccyFlgInfManage' },
      { key: '000-03-06', text: '金额代码维护', to: 'cas/transManage/amtCdeInfManage' },
    ],
  },
  {
    key: '001-04',
    icon: 'setting',
    text: '开户管理',
    children: [
      { key: '000-04-01', text: '开户场景管理', to: 'cas/openAccManage/openAccSceneManage' },
    ],
  },
  {
    key: '001-05',
    icon: 'setting',
    text: '流水查询',
    children: [
      { key: '000-05-01', text: '账务流水查询', to: 'cas/casJnlQry/casTxnJnl' },
      { key: '000-05-02', text: '账户流水查询', to: 'cas/casJnlQry/casBokAccJnl' },
      { key: '000-05-03', text: '记账凭证查询', to: 'cas/casJnlQry/casAccVoucherInf' },
      { key: '000-05-04', text: '会计分录流水查询', to: 'cas/casJnlQry/casAccEntryJnl' },
    ],
  },
  {
    key: '001-06',
    icon: 'setting',
    text: '账务处理',
    children: [
      { key: '000-06-01', text: '账务调账', to: 'cas/accTreatment/accountAdjustmentManage' },
      { key: '000-06-02', text: '账户充值', to: 'cas/accTreatment/accountRechargeManage' },
    ],
  },
  {
    key: '001-09',
    icon: 'setting',
    text: '试算平衡',
    children: [
      { key: '000-09-01', text: '科目余额核对', to: 'cas/calculateBalance/subjectDayEndBalManage' },
      { key: '000-09-02', text: '科目体系平衡查询', to: 'cas/calculateBalance/subjectBalanceManage' },
      { key: '000-09-03', text: '账户余额核对', to: 'cas/calculateBalance/accDayEndBalManage' },
      { key: '000-09-04', text: '账户总分核对', to: 'cas/calculateBalance/accountCheckManage' },
    ],
  },
  {
    key: '001-08',
    icon: 'setting',
    text: '冻结管理',
    children: [
      { key: '000-08-01', text: '冻结管理', to: 'cas/accFrozManage/accFrozDetailManage' },
    ],
  },
  {
    key: '001-07',
    icon: 'setting',
    text: '任务管理',
    children: [
      {
        key: '001-07-01',
        icon: 'setting',
        text: '科目任务',
        children: [
          { key: '000-07-01-01', text: '业务类别新增', to: 'cas/taskManage/taskBusTypGroupAddManage' },
          { key: '000-07-01-02', text: '业务类别禁用', to: 'cas/taskManage/taskBusTypGroupDelManage' },
          { key: '000-07-01-05', text: '业务类别启用', to: 'cas/taskManage/taskBusTypGroupEnableManage' },
          { key: '000-07-01-03', text: '科目代码新增', to: 'cas/taskManage/taskSubCodeAddManage' },
          { key: '000-07-01-04', text: '科目代码禁用', to: 'cas/taskManage/taskSubCodeDelManage' },
          { key: '000-07-01-06', text: '科目代码启用', to: 'cas/taskManage/taskSubCodeEnableManage' },
        ],
      },
      {
        key: '001-07-02',
        icon: 'setting',
        text: '账户任务',
        children: [
          { key: '000-07-02-01', text: '子账户类别新增', to: 'cas/taskManage/taskSubAccCategoryAddManage' },
          { key: '000-07-02-02', text: '子账户类别删除', to: 'cas/taskManage/taskSubAccCategoryDelManage' },
          { key: '000-07-02-03', text: '开户场景新增', to: 'cas/taskManage/taskOpenAccSceneAddManage' },
          { key: '000-07-02-04', text: '开户场景修改', to: 'cas/taskManage/taskOpenAccSceneUpdManage' },
          { key: '000-07-02-05', text: '开户场景删除', to: 'cas/taskManage/taskOpenAccSceneDelManage' },
          { key: '000-07-02-06', text: '账户开户', to: 'cas/taskManage/taskAccProfilesAddManage' },
          { key: '000-07-02-07', text: '账户销户', to: 'cas/taskManage/taskAccProfilesDeleteManage' },
          { key: '000-07-02-08', text: '账户解冻', to: 'cas/taskManage/taskAccProfilesUnfreezeManage' },
          { key: '000-07-02-09', text: '账户充值', to: 'cas/taskManage/taskAccProfilesRechargeManage' },
          { key: '000-07-02-10', text: '账户调账', to: 'cas/taskManage/taskAccProfilesAdjustmentManage' },
          { key: '000-07-02-13', text: '账户冻结', to: 'cas/taskManage/taskAccProfilesFrozenManage' },
          { key: '000-07-02-11', text: '记账方式删除', to: 'cas/taskManage/taskAccModeInfDeleteManage' },
          { key: '000-07-02-12', text: '记账维护新增', to: 'cas/taskManage/taskAccManageInfAddManage' },
        ],
      },
      {
        key: '001-07-03',
        icon: 'setting',
        text: '交易任务',
        children: [
          { key: '000-07-03-01', text: '分录规则新增', to: 'cas/taskManage/taskAccEntryRulesInfAddManage' },
          { key: '000-07-03-02', text: '分录规则修改', to: 'cas/taskManage/taskAccEntryRulesInfUpdateManage' },
          { key: '000-02-03-03', text: '分录规则删除', to: 'cas/taskManage/taskAccEntryRulesInfDeleteManage' },
          { key: '000-02-03-04', text: '匹配会记分录', to: 'cas/taskManage/taskTxnSubCodeEntryIdManage' },
          { key: '000-02-03-05', text: '匹配外部交易码', to: 'cas/taskManage/taskTxnSubCodeExtCodManage' },
          { key: '000-07-03-07', text: '外部交易码新增', to: 'cas/taskManage/taskTransRelatedExtAddManage' },
          { key: '000-07-03-08', text: '外部交易码删除', to: 'cas/taskManage/taskTransRelatedExtDeleteManage' },
          { key: '000-07-03-09', text: '金额代码新增', to: 'cas/taskManage/taskAmtCdeInfAddManage' },
          { key: '000-07-03-10', text: '金额代码删除', to: 'cas/taskManage/taskAmtCdeInfDeleteManage' },
          { key: '000-07-03-11', text: '币种新增', to: 'cas/taskManage/taskCcyFlgInfAddManage' },
          { key: '000-07-03-12', text: '币种修改', to: 'cas/taskManage/taskCcyFlgInfUpdateManage' },
        ],
      },
    ],
  },
];

/**
 * 解析token
 */
const parseToken = (url) => {
  const key = '?k=';
  const idx = url.indexOf(key);
  let param = null;
  if (idx !== -1) {
    let str = '';
    const nurl = url.substring(idx);
    const idx2 = nurl.indexOf('&');
    str = nurl.substring(key.length, idx2 === -1 ? url.length : idx2);
    param = (str !== '' ? decode(str, 'base64', true) : '');  // should url safe
    const p = (param !== '' ? qs.parse(param) : {});
    setToken(p.user, p.tk);
    return p;
  }
  return param;
}
/**
 * 通过递归方式构建面包屑导航数据
 * 菜单的key必须满足一定规则 如：
 * 1, 11, 12, 111, 112 或 1, 1-1, 1-2, 1-1-1, 1-1-2
 * 叶子菜单的key能够查找到父菜单的key，并且位置在第一位
 */
const buildBreadPath = (menuItems, key) => {
  let path = '';
  for (let i = 0; i < menuItems.length; i++) {
    const item = menuItems[i];
    if (key.indexOf(item.key) === 0) {
      path = item.text;
      if (item.children && item.children.length > 0) {
        const cPath = buildBreadPath(item.children, key);
        path += `,${cPath}`;
      }
    }
  }
  return path;
}

export default {
  namespace: 'indexPage',
  state: {
    loginVisible: false,
    loginLoading: false,
    username: '',
    breadPath: [commonMap.home],
    menuItems: [],
    // menuItems: casMenu,
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          dispatch({
            type: 'updateState',
            payload: { breadPath: [commonMap.home] },
          });
          try {
            const param = parseToken(window.location.href);
            const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
            const token = (param === null ? getToken(username) : param.tk);
            dispatch({
              type: 'querySysMenu',
              payload: { token, username },  // 101预警监控平台
            });
          } catch (e) {
            console.log('parse tk error');
          }
        }
      });
    },
  },
  effects: {
    * querySysMenu({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { username: payload.username },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.querySysMenu, {
        token: payload.token, sysId: '001', language: Config.language,
      });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            menuItems: detail.rspData.usrLoginAuthList,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failLogin, 'error');
        setTimeout(() => {
          window.location.href = Config.loginUrl;
        }, 3200);
      }
    },
    * relogin({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { loginLoading: true },
      });
      const username = getCookie(`${Config.app}_USR`);
      const token = getToken(username);
      const param = {
        usrName: payload.username,
        usrPsw: encode(payload.password, 'md5'),
        token: token,
      }
      const res = yield call(service.relogin, param);
      const detail = parseResponse(res);
      //登录时返回的参数200代表成功  参数值放在rspData
      if (detail.rspCod === '200') {
        const token = detail.rspData.token;
        setToken(payload.username, token);
        yield put({
          type: 'updateState',
          payload: { loginLoading: false, loginVisible: false },
        });

        const res2 = yield call(service.querySysMenu, {
          token: token, sysId: '001', language: Config.language,
        });
        const detail2 = parseResponse(res2);
        if (detail2.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: {
              menuItems: detail2.rspData.usrLoginAuthList,
            },
          });
        } else {
          callNotice(commonMap.fail, detail2.rspMsg || commonMap.failLogin, 'error');
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { loginLoading: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * logout({ payload }, { call, put }) {
      const param = parseToken(window.location.href);
      const username = (param === null ? getCookie(`${Config.app}_USR`) : param.user);
      const token = (param === null ? getToken(username) : param.tk);
      const res = yield call(service.logout, { ...payload, token });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload,
        });
        window.location.href = Config.loginUrl;
      } else {
        //removeToken(payload.usrName);
        yield put({
          type: 'updateState',
          payload: { tk: null, loading: false },
        });
        console.log('windows.location=>', Config.loginUrl)
        window.location.href = Config.loginUrl;
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },
  reducers: {
    // 公用状态更新方法 参数的属性和状态的属性一致即可
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    updateBreadPath(state, action) {
      const path = `${commonMap.home},${buildBreadPath(state.menuItems, action.payload.key.toString())}`;
      return { ...state, breadPath: path.split(',') };
    },
  },
}
