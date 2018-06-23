import * as service from '../../../services/cas/transBase';
import * as subCodeService from '../../../services/cas/transSubCode';
import * as entryRulesService from '../../../services/cas/accEntryRulesInf';
import * as subRelatedExtService from '../../../services/cas/transRelatedExt';
import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'transBaseManage';
const objectId = 'txnCode';
const enterPath = '/cas/transManage/transBaseManage';
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
const entryRulesTableLoadFinOpt = {
  type: 'updateState',
  payload: { entryRulesTableLoading: false },
};
const subRelatedExtTableLoadFinOpt = {
  type: 'updateState',
  payload: { subRelatedExtTableLoading: false },
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
    addFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    attachInfoData: {},
    attachInfoModalVisible: false,
    spinLoading: false,
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    codeTableRecord: {},
    addSubModalVisible: false,
    addSubFormSubmit: false,
    updateSubFormData: {},
    updateSubModalVisible: false,
    updateSubFormSubmit: false,
    infoSubModalVisible: false,
    infoSubTableData: {},
    entryRulesTableParam: { currentPage: 1, entSts: '00' },
    entryRulesTableLoading: false,
    entryRulesTableList: [],
    entryRulesTableTotal: 0,
    entryRulesTableCurrentPage: 1,
    entryRulesModalVisible: false,
    subRelatedExtTableParam: { currentPage: 1, extSts: '00' },
    subRelatedExtTableLoading: false,
    subRelatedExtTableList: [],
    subRelatedExtTableTotal: 0,
    subRelatedExtTableCurrentPage: 1,
    subRelatedExtModalVisible: false,
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
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
          payload: { addModalVisible: false, addFormSubmit: false },
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
            payload: { tableList: result.rspList, tableTotal: result.total },
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
    * addSubOne({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { addSubFormSubmit: true },
      });
      const res = yield call(subCodeService.addOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { addSubModalVisible: false, addSubFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
      } else {
        yield put({
          type: 'updateState',
          payload: { addSubFormSubmit: false },
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
    * updateSubOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { updateSubFormSubmit: true },
      });
      const res = yield call(subCodeService.updateOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSubSuccess',
          payload,
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
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { updateSubFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * updateStatus({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(subCodeService.updateListStatus, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
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
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * deleteOne({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
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
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },

    * deleteSubOne({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(subCodeService.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
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
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * matchEntryInit({ payload }, { call, put }) {
      const codeTableRecord = payload.record;
      yield put({
        type: 'updateState',
        payload: { ...payload, entryRulesTableLoading: true },
      });
      const res = yield call(entryRulesService.queryList, { ...payload.entryRulesTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { codeTableRecord, entryRulesTableList: detail.rspList, entryRulesTableTotal: detail.total, entryRulesTableCurrentPage: payload.entryRulesTableParam.currentPage },
        });
        yield put(entryRulesTableLoadFinOpt);
        if (payload.changeVisible) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'entryRules' },
          });
        }
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOneEntryRule({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { updateSubFormSubmit: true },
      });
      const res = yield call(subCodeService.updateSubEntryId, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSubSuccess',
          payload,
        });
        yield put({
          type: 'toggleModal',
          payload: { type: 'entryRules' },
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
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { updateSubFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * matchSubRelatedExtInit({ payload }, { call, put }) {
      const codeTableRecord = payload.record;
      yield put({
        type: 'updateState',
        payload: { ...payload, subRelatedExtTableLoading: true },
      });
      const res = yield call(subRelatedExtService.queryList, { ...payload.subRelatedExtTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { codeTableRecord, subRelatedExtTableList: detail.rspList, subRelatedExtTableTotal: detail.total, subRelatedExtTableCurrentPage: payload.subRelatedExtTableParam.currentPage },
        });
        yield put(subRelatedExtTableLoadFinOpt);
        if (payload.changeVisible) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'subRelatedExt' },
          });
        }
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOneSubRelatedExt({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { updateSubFormSubmit: true },
      });
      const res = yield call(subCodeService.updateSubExtCod, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateSubSuccess',
          payload,
        });
        yield put({
          type: 'toggleModal',
          payload: { type: 'subRelatedExt' },
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
            payload: { tableList: result.rspList, tableTotal: result.total },
          });
        }
        yield put(tableLoadFinOpt);
      } else {
        yield put({
          type: 'updateState',
          payload: { updateSubFormSubmit: false },
        });
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
          newState = { ...state, addModalVisible: !state.addModalVisible };
          break;
        case 'update':
          newState = { ...state, updateFormData: action.payload.data, updateModalVisible: !state.updateModalVisible };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'addSub':
          newState = { ...state, addFormData: action.payload.data, addSubModalVisible: !state.addSubModalVisible };
          break;
        case 'updateSub':
          newState = { ...state, updateSubFormData: action.payload.data, updateSubModalVisible: !state.updateSubModalVisible };
          break;
        case 'detailSub':
          newState = { ...state, infoSubTableData: action.payload.data, infoSubModalVisible: !state.infoSubModalVisible };
          break;
        case 'entryRules':
          newState = { ...state, entryRulesModalVisible: !state.entryRulesModalVisible };
          break;
        case 'subRelatedExt':
          newState = { ...state, subRelatedExtModalVisible: !state.subRelatedExtModalVisible };
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
    updateSubSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, updateSubFormSubmit: false, updateSubModalVisible: false };
    },
  },
};
