import * as service from '../../../services/cas/subAccCategory';
import * as profilesService from '../../../services/cas/accProfiles';

import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'subAccCategoryManage';
const objectId = 'cateId';
const enterPath = '/cas/accManage/subAccCategoryManage';
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
const profilesTableLoadFinOpt = {
  type: 'updateState',
  payload: { profilesTableLoading: false },
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
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    profilesTableParam: { currentPage: 1 },
    profilesTableLoading: false,
    profilesTableList: [],
    profilesTableTotal: 0,
    profilesTableCurrentPage: 1,
    deleteModalVisible: false,
    deleteFormData: {},
    deleteFormSubmit: false,
    hasProfiles: false,
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
    * updateStatus({ payload }, { call, put }) {
      yield put(tableLoadOpt);
      const res = yield call(service.updateList, { ...payload });
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
    * deleteOne({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: { deleteFormSubmit: true },
      });
      const res = yield call(service.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'deleteSuccess',
          payload,
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        // 获取当前命名控件的查询条件 重新查询列表
        const tableParam = yield select(state => state[namespace].tableParam);
        yield put(tableLoadOpt);
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
          payload: { deleteFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * subAccCategoryDelInit({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, profilesTableLoading: true },
      });
      let hasList = false;
      const res = yield call(service.accOfCates, { ...payload.profilesTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        if (detail.total === 0) {
          hasList = false;
        } else {
          hasList = true;
        }
        yield put({
          type: 'updateState',
          payload: { profilesTableList: detail.rspList, profilesTableTotal: detail.total, profilesTableCurrentPage: payload.profilesTableParam.currentPage, hasProfiles: hasList },
        });
        yield put(profilesTableLoadFinOpt);
        if (payload.changeVisible) {
          yield put({
            type: 'toggleModal',
            payload: { type: 'delete', data: payload.deleteFormData },
          });
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { deleteFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * cancelAccount({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { deleteFormSubmit: true },
      });
      const res = yield call(profilesService.deleteOne, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { deleteFormSubmit: false },
        });
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
        yield put({
          type: 'updateState',
          payload: { ...payload, profilesTableLoading: true },
        });
        let hasList = false;
        const res = yield call(service.accOfCates, { ...payload.deleteFormData });
        const result = parseResponse(res);
        if (result.rspCod === '200') {
          if (result.total === 0) {
            hasList = false;
          } else {
            hasList = true;
          }
          yield put({
            type: 'updateState',
            payload: { profilesTableList: result.rspList, profilesTableTotal: result.total, profilesTableCurrentPage: 1, hasProfiles: hasList },
          });
          yield put(profilesTableLoadFinOpt);
        }
      } else {
        yield put({
          type: 'updateState',
          payload: { deleteFormSubmit: false },
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
        case 'delete':
          newState = { ...state, deleteFormData: action.payload.data, deleteModalVisible: !state.deleteModalVisible };
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
      const cusSts = action.payload.cusSts;
      const newTableList = state.tableList.map((item) => {
        if (ids.indexOf(item[objectId]) !== -1) {
          return { ...item, cusSts: cusSts };
        }
        return item;
      });
      return { ...state, tableLoading: false, tableList: newTableList };
    },
    deleteSuccess(state, action) {
      const newItem = action.payload;
      const newTableList = state.tableList.map((item) => {
        if (item[objectId] === newItem[objectId]) {
          return { ...item, ...newItem };
        }
        return item;
      });
      return { ...state, tableList: newTableList, deleteFormSubmit: false, deleteModalVisible: false };
    },
  },
};
