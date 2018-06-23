import * as service from '../services/home';
import { parseResponse } from '../utils/request';
import { getCookie, getToken } from '../utils/storage';
import { callNotice } from '../utils/alert';
import * as i18n from '../utils/i18n';
import { amtListMinUnitToStandUnit } from '../utils/amount';

const commonMap = i18n.commonMap();
const enterPath = '/home';
export default {
  namespace: 'home',
  state: {
    monthList: [],
    bankValueList: [],
    visaValueList: [],
    masterValueList: [],
    aliValueList: [],
    wechatValueList: [],
    todayValueList: [],
    storeList: [],
    storeValueList: [],
    termList: [],
    termValueList: [],
    settleInfo: {
      amt1: 0, amt1Unit: 'CNY', amt2: 0, amt2Unit: 'CNY',
    },
  },
  // 订阅
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryHisCount' });
          dispatch({ type: 'queryTodayCount' });
          dispatch({ type: 'queryStoreCount' });
          dispatch({ type: 'queryTermCount' });
          dispatch({ type: 'querySettleCount' });
        }
      });
    },
  },
  effects: {
    * queryHisCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryHisCount);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            monthList: detail.rspData.monthList,
            bankValueList: amtListMinUnitToStandUnit(detail.rspData.bankValueList, detail.rspData.CCY || 'CNY'),
            visaValueList: amtListMinUnitToStandUnit(detail.rspData.visaValueList, detail.rspData.CCY || 'CNY'),
            masterValueList: amtListMinUnitToStandUnit(detail.rspData.masterValueList, detail.rspData.CCY || 'CNY'),
            aliValueList: amtListMinUnitToStandUnit(detail.rspData.aliValueList, detail.rspData.CCY || 'CNY'),
            wechatValueList: amtListMinUnitToStandUnit(detail.rspData.wechatValueList, detail.rspData.CCY || 'CNY'),
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
    * queryTodayCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryTodayCount);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            todayValueList: detail.rspData.todayCount,
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
    * queryStoreCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryStoreCount);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            storeList: amtListMinUnitToStandUnit(detail.rspData.braValueList, detail.rspData.CCY || 'CNY'),
            storeValueList: amtListMinUnitToStandUnit(detail.rspData.countValueList, detail.rspData.CCY || 'CNY'),
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
    * queryTermCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.queryTermCount);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            termList: amtListMinUnitToStandUnit(detail.rspData.termList, detail.rspData.CCY || 'CNY'),
            termValueList: amtListMinUnitToStandUnit(detail.rspData.countValueList, detail.rspData.CCY || 'CNY'),
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
    * querySettleCount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload },
      });
      // call:调用执行一个函数而 put:dispatch一个action
      const res = yield call(service.querySettleCount);
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: {
            settleInfo: { 
              amt1: detail.rspData.watStlAmt === null ? 0 : detail.rspData.watStlAmt, 
              amt1Unit: detail.rspData.CCY, 
              amt2: detail.rspData.sucStlAmt === null ? 0 : detail.rspData.sucStlAmt, 
              amt2Unit: detail.rspData.CCY 
            },
          },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.errorInfo, 'error');
      }
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
  },
}
