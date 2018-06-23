import * as service from '../../../services/cas/accFundsTrans';
import * as chnInfService from '../../../services/cas/payChnInf';
import * as ccyFlgInfService from '../../../services/cas/ccyFlgInf';
import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'accountFundsTransManage';
const enterPath = '/cas/accTreatment/accountFundsTransManage';
// 基础公共信息
const commonMap = i18n.commonMap();

export default {
  namespace,
  state: {
    tableCurrentPage: 1,
    advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableSelects: [],
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    spinLoading: false,
    addFormData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    subjectData: {},
    subjectModalVisible: false,
    cusData: {},
    cusModalVisible: false,
    chnData: {},
    chnModalVisible: false,
    ccyOptionsData: [],
    adjustmentSubmit: false,
    cCusModalVisible: false,
    cCusData: {},
    cSubjectModalVisible: false,
    cSubjectData: {},
    cChnData: {},
    cChnModalVisible: false,
    tabsGroupsData: [],
    tabsFormData: {},
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'qryFundsTransInfo', payload: {} });
          dispatch({ type: 'queryCcyOptionsData', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    * qryFundsTransInfo({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { addFormData: {} },
      });
      const res = yield call(service.qryFundsTransInfo, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tabsGroupsData: detail.rspList, addFormData: detail.rspData },
        });
      }
    },

    * accountFundsTrans({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { adjustmentSubmit: true },
      });
      const res = yield call(service.accountFundsTrans, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { adjustmentSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'toggleModal',
          payload: { type: 'add' },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: { adjustmentSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * queryChnList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { chnModalVisible: true },
        });
      }
      const tempChnData = {};
      tempChnData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { chnData: tempChnData },
      });
      const res = yield call(chnInfService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempChnData.tableList = detail.rspList;
        tempChnData.tableTotal = detail.total;
        tempChnData.tableCurrentPage = payload.tableParam.currentPage
        tempChnData.tableLoading = false;
        tempChnData.tableParam = payload.tableParam
        if (tempChnData.tableParam.isFirst) {
          delete tempChnData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { chnData: tempChnData },
        });
      }
    },

    * cQueryChnList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { cChnModalVisible: true },
        });
      }
      const tempChnData = {};
      tempChnData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { cChnData: tempChnData },
      });
      const res = yield call(chnInfService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempChnData.tableList = detail.rspList;
        tempChnData.tableTotal = detail.total;
        tempChnData.tableCurrentPage = payload.tableParam.currentPage
        tempChnData.tableLoading = false;
        tempChnData.tableParam = payload.tableParam
        if (tempChnData.tableParam.isFirst) {
          delete tempChnData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { cChnData: tempChnData },
        });
      }
    },
    * queryCcyOptionsData({ payload }, { call, put }) {
      const res = yield call(ccyFlgInfService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { ccyOptionsData: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
  },

  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    toggleAdvExpand(state) {
      return { ...state, advExpand: !state.advExpand };
    },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      switch (type) {
        case 'add':
          newState = {
            ...state, addFormData: {}, subjectData: {}, cusData: {},
          };
          break;
        default:
          break;
      }
      return newState;
    },
  },
};
