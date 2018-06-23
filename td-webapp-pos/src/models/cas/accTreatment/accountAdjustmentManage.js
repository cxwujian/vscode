import * as service from '../../../services/cas/accAdjustment';
import * as subjectService from '../../../services/cas/subjectCode';
import * as cusInfService from '../../../services/cas/cusInf';
import * as chnInfService from '../../../services/cas/payChnInf';
import * as ccyFlgInfService from '../../../services/cas/ccyFlgInf';
import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'accountAdjustmentManage';
const enterPath = '/cas/accTreatment/accountAdjustmentManage';
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryCcyOptionsData', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    * accountAdjustment({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { adjustmentSubmit: true },
      });
      const res = yield call(service.accountAdjustment, { ...payload });
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

    * querySubjectList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { subjectModalVisible: true },
        });
      }
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
      const tempSubjectData = {};
      tempSubjectData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { subjectData: tempSubjectData },
      });
      const res = yield call(subjectService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempSubjectData.tableList = detail.rspList;
        tempSubjectData.tableTotal = detail.total;
        tempSubjectData.tableCurrentPage = payload.tableParam.currentPage
        tempSubjectData.tableLoading = false;
        tempSubjectData.tableParam = payload.tableParam
        if (tempSubjectData.tableParam.isFirst) {
          delete tempSubjectData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { subjectData: tempSubjectData },
        });
      }
    },
    * queryCusList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { cusModalVisible: true },
        });
      }
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
      const tempCusData = {};
      tempCusData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { cusData: tempCusData },
      });
      const res = yield call(cusInfService.queryCusAdjustCateList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempCusData.tableList = detail.rspList;
        tempCusData.tableTotal = detail.total;
        tempCusData.tableCurrentPage = payload.tableParam.currentPage
        tempCusData.tableLoading = false;
        tempCusData.tableParam = payload.tableParam;
        tempCusData.expandedRowKeys = detail.rspData;
        if (tempCusData.tableParam.isFirst) {
          delete tempCusData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { cusData: tempCusData },
        });
      }
    },
    * cQuerySubjectList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { cSubjectModalVisible: true },
        });
      }
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
      const tempSubjectData = {};
      tempSubjectData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { subjectData: tempSubjectData },
      });
      const res = yield call(subjectService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempSubjectData.tableList = detail.rspList;
        tempSubjectData.tableTotal = detail.total;
        tempSubjectData.tableCurrentPage = payload.tableParam.currentPage
        tempSubjectData.tableLoading = false;
        tempSubjectData.tableParam = payload.tableParam
        if (tempSubjectData.tableParam.isFirst) {
          delete tempSubjectData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { cSubjectData: tempSubjectData },
        });
      }
    },
    * cQueryCusList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { cCusModalVisible: true },
        });
      }
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
      const tempCusData = {};
      tempCusData.tableLoading = true;
      yield put({
        type: 'updateState',
        payload: { cusData: tempCusData },
      });
      const res = yield call(cusInfService.queryCusAdjustCateList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempCusData.tableList = detail.rspList;
        tempCusData.tableTotal = detail.total;
        tempCusData.tableCurrentPage = payload.tableParam.currentPage
        tempCusData.tableLoading = false;
        tempCusData.tableParam = payload.tableParam;
        tempCusData.expandedRowKeys = detail.rspData;
        if (tempCusData.tableParam.isFirst) {
          delete tempCusData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { cCusData: tempCusData },
        });
      }
    },

    * queryChnList({ payload }, { call, put }) {
      if (payload.tableParam.isFirst) {
        yield put({
          type: 'updateState',
          payload: { chnModalVisible: true },
        });
      }
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
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
      yield put({
        type: 'updateState',
        payload: { addFormData: payload.formdata },
      });
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
