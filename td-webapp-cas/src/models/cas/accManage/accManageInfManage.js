import * as service from '../../../services/cas/accManageInf';
import * as subjectService from '../../../services/cas/subjectCode';
import * as cusInfService from '../../../services/cas/cusInf';
import * as accModeInfService from '../../../services/cas/accModeInf';
import * as subCategoreService from '../../../services/cas/subAccCategory';
import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'accManageInfManage';
const objectId = 'actNo';
const enterPath = '/cas/accManage/accManageInfManage';
// 基础公共信息
const commonMap = i18n.commonMap();

const tableLoadOpt = {
  type: 'updateState',
  payload: { tableSelects: [], tableLoading: true },
};

const tableLoadFinOpt = {
  type: 'updateState',
  payload: { tableLoading: false },
};

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
    frozenModalVisible: false,
    frozenFormData: {},
    frozenFormSubmit: false,
    handleTableParam: { currentPage: 1 },
    handleTableCurrentPage: 1,
    handleTableList: [],
    handleTableTotal: 0,
    handleType: '',
    handleModalVisible: false,
    handleFormSubmit: false,
    selectRecord: {},
    accModeInfDate: [],
    subAccCategoryDates: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryaccModeInf', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'querySubAccIdOptionsData', payload: { tableParam: { currentPage: 1 } } });
        }
      });
    },
  },

  effects: {
    * queryList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, tableSelects: [], tableLoading: true },
      });
      const res = yield call(service.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { tableList: detail.rspList, tableTotal: detail.total, tableCurrentPage: payload.tableParam.currentPage },
        });
      }
      yield put(tableLoadFinOpt);
    },
    * addOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { addFormSubmit: true },
      });
      const res = yield call(service.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addModalVisible: false, addFormSubmit: false, addFormData: {} },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put({
          type: 'updateState',
          payload: { tableSelects: [], tableLoading: true },
        });
        const res = yield call(service.queryList, { ...tableParam });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          yield put({
            type: 'updateState',
            payload: { tableList: result.rspList, tableTotal: result.total, tableCurrentPage: tableParam.currentPage },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { addFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * updateOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { updateFormSubmit: true },
      });
      const res = yield call(service.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOneState({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { handleFormSubmit: true },
      });
      const res = yield call(service.updateOneState, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'handleSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { handleFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * updateStatus({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.updateListStatus, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateStatusSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put(tableLoadFinOpt);
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
      const res = yield call(cusInfService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        tempCusData.tableList = detail.rspList;
        tempCusData.tableTotal = detail.total;
        tempCusData.tableCurrentPage = payload.tableParam.currentPage
        tempCusData.tableLoading = false;
        tempCusData.tableParam = payload.tableParam
        if (tempCusData.tableParam.isFirst) {
          delete tempCusData.tableParam.isFirst;
        }
        yield put({
          type: 'updateState',
          payload: { cusData: tempCusData },
        });
      }
    },
    * queryaccModeInf({ payload }, { call, put }) {
      const res = yield call(accModeInfService.queryAllList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { accModeInfDate: detail.rspList },
        });
      }
    },
    * querySubAccIdOptionsData({ payload }, { call, put }) {
      const res = yield call(subCategoreService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { subAccCategoryDates: detail.rspList },
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
            ...state, addFormData: action.payload.data, addModalVisible: !state.addModalVisible,
            subjectData: {}, cusData: {},
          };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'frozen':
          newState = { ...state, frozenFormData: action.payload.data, frozenModalVisible: !state.frozenModalVisible };
          break;
        case 'updateList':
          if (action.payload.data.changeVisible) {
            newState = { ...state, handleType: action.payload.data.handleType, handleTableList: action.payload.data.handleTableList, handleTableTotal: action.payload.data.handleTableTotal, handleTableCurrentPage: action.payload.data.handleTableCurrentPage, selectRecord: action.payload.data.selectRecord, handleModalVisible: !state.handleModalVisible };
          } else {
            newState = { ...state, handleType: action.payload.data.handleType, handleTableList: action.payload.data.handleTableList, handleTableTotal: action.payload.data.handleTableTotal, handleTableCurrentPage: action.payload.data.handleTableCurrentPage, selectRecord: action.payload.data.selectRecord };
          }
          break;
        default:
          break;
      }
      return newState;
    },

    updateSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false };
    },
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
    updateStatusSuccess(state, action) {
      const ids = action.payload.ids;
      const accSts = action.payload.accSts;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, accSts: accSts };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
  },
};
