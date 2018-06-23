import * as service from '../../../services/cas/accEntryRulesInf';
import * as subjectService from '../../../services/cas/subjectCode';
import * as ccyFlgInfService from '../../../services/cas/ccyFlgInf';
import * as amtCdeInfService from '../../../services/cas/amtCdeInf';
import { parseResponse } from '../../../utils/request';
import { callNotice } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

// 基础配置信息
const namespace = 'accEntryRulesInfManage';
const objectId = 'entryId';
const enterPath = '/cas/transManage/accEntryRulesInfManage';
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
const miniFormTableLoadFinOpt = {
  type: 'updateState',
  payload: { miniFormTableLoading: false },
};

export default {
  namespace,
  state: {
    // advExpand: false,
    tableParam: { currentPage: 1 },
    tableLoading: false,
    tableList: [],
    tableTotal: 0,
    tableCurrentPage: 1,
    tableSelects: [],
    addModalVisible: false,
    addFormSubmit: false,
    addFormData: {},
    updateModalVisible: false,
    updateFormSubmit: false,
    updateFormData: {},
    infoModalVisible: false,
    infoTableData: {},
    /* ====== 对于基本Manage页面 以上基本CRUD操作状态不需要修改 额外业务功能状态添加在下方 ====== */
    miniFormTableParam: { isLastLev: '1', subSts: '00', currentPage: 1 },
    miniFormTableLoading: false,
    miniFormTableList: [],
    miniFormTableTotal: 0,
    miniFormTableCurrentPage: 1,
    showSubjectTable: false,
    ccyOptionsData: [],
    amtRulOptionsData: [],
    dSubjectKeys: [0],
    cSubjectKeys: [0],

  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === enterPath) {
          dispatch({ type: 'queryList', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'querySubjectList', payload: { miniFormTableParam: { isLastLev: '1', subSts: '00', currentPage: 1 } } });
          dispatch({ type: 'queryCcyOptionsData', payload: { tableParam: { currentPage: 1 } } });
          dispatch({ type: 'queryAmtRulOptionsData', payload: { tableParam: { currentPage: 1 } } });
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
    * queryAmtRulOptionsData({ payload }, { call, put }) {
      const res = yield call(amtCdeInfService.queryList, { ...payload.tableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { amtRulOptionsData: detail.rspList },
        });
      } else {
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * updateOne({ payload }, { call, put, select }) {
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
          payload: { updateFormSubmit: false },
        });
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
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
    * deleteList({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.deleteList, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
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
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },


    /* ====== 对于基本Manage页面 以上基本CRUD方法不需要修改 额外业务功能方法添加在下方 ====== */
    * updateStatus({ payload }, { call, put, select }) {
      yield put(tableLoadOpt);
      const res = yield call(service.updateListStatus, { ...payload });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        callNotice(commonMap.success, detail.rspMsg || commonMap.success, 'success');
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
        yield put(tableLoadFinOpt);
        callNotice(commonMap.fail, detail.rspMsg || commonMap.failInfo, 'error');
      }
    },
    * querySubjectList({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: { ...payload, miniFormTableLoading: true },
      });
      const res = yield call(subjectService.queryList, { ...payload.miniFormTableParam });
      const detail = parseResponse(res);
      if (detail.rspCod === '200') {
        yield put({
          type: 'updateState',
          payload: { miniFormTableList: detail.rspList, miniFormTableTotal: detail.total, miniFormTableCurrentPage: payload.miniFormTableParam.currentPage },
        });
      }
      yield put(miniFormTableLoadFinOpt);
    },
  },
  reducers: {
    updateState(state, action) {
      return { ...state, ...action.payload };
    },
    // toggleAdvExpand(state) {
    //   return { ...state, advExpand: !state.advExpand };
    // },
    toggleModal(state, action) {
      const type = action.payload.type;
      let newState = state;
      const dkey = [0, 1, 2, 3, 4];
      const ckey = [0, 1, 2, 3, 4];
      let updateFormData = {};
      let dAmtRulA = [];
      let dAmtRulB = [];
      let dAmtRulC = [];
      let dAmtRulD = [];
      let dAmtRulE = [];
      let cAmtRulA = [];
      let cAmtRulB = [];
      let cAmtRulC = [];
      let cAmtRulD = [];
      let cAmtRulE = [];
      switch (type) {
        case 'add':
          newState = {
            ...state, addFormData: action.payload.data, addModalVisible: !state.addModalVisible, showSubjectTable: false,
            dSubjectKeys: [0], cSubjectKeys: [0],
          };
          break;
        case 'update':
          updateFormData = action.payload.data;
          if (!updateFormData.dSubjectE) {
            dkey.splice(3, 1);
            if (!updateFormData.dSubjectD) {
              dkey.splice(2, 1);
              if (!updateFormData.dSubjectC) {
                dkey.splice(1, 1);
                if (!updateFormData.dSubjectB) {
                  dkey.splice(0, 1);
                }
              }
            }
          }
          if (!updateFormData.cSubjectE) {
            ckey.splice(3, 1);
            if (!updateFormData.cSubjectD) {
              ckey.splice(2, 1);
              if (!updateFormData.cSubjectC) {
                ckey.splice(1, 1);
                if (!updateFormData.cSubjectB) {
                  ckey.splice(0, 1);
                }
              }
            }
          }
          if (updateFormData.dAmtRulA) {
            dAmtRulA = updateFormData.dAmtRulA.split(',');
            if (dAmtRulA.length > 0) {
              updateFormData.dAmtRulA0 = dAmtRulA[0];
              if (dAmtRulA.length > 2) {
                updateFormData.dAmtRulAOpt0 = dAmtRulA[1];
                updateFormData.dAmtRulA1 = dAmtRulA[2];
                if (dAmtRulA.length > 4) {
                  updateFormData.dAmtRulAOpt1 = dAmtRulA[3];
                  updateFormData.dAmtRulA2 = dAmtRulA[4];
                }
              }
            }
          }
          if (updateFormData.dAmtRulB) {
            dAmtRulB = updateFormData.dAmtRulB.split(',');
            if (dAmtRulB.length > 0) {
              updateFormData.dAmtRulB0 = dAmtRulB[0];
              if (dAmtRulB.length > 2) {
                updateFormData.dAmtRulBOpt0 = dAmtRulB[1];
                updateFormData.dAmtRulB1 = dAmtRulB[2];
                if (dAmtRulB.length > 4) {
                  updateFormData.dAmtRulBOpt1 = dAmtRulB[3];
                  updateFormData.dAmtRulB2 = dAmtRulB[4];
                }
              }
            }
          }
          if (updateFormData.dAmtRulC) {
            dAmtRulC = updateFormData.dAmtRulC.split(',');
            if (dAmtRulC.length > 0) {
              updateFormData.dAmtRulC0 = dAmtRulC[0];
              if (dAmtRulC.length > 2) {
                updateFormData.dAmtRulCOpt0 = dAmtRulC[1];
                updateFormData.dAmtRulC1 = dAmtRulC[2];
                if (dAmtRulC.length > 4) {
                  updateFormData.dAmtRulCOpt1 = dAmtRulC[3];
                  updateFormData.dAmtRulC2 = dAmtRulC[4];
                }
              }
            }
          }
          if (updateFormData.dAmtRulD) {
            dAmtRulD = updateFormData.dAmtRulD.split(',');
            if (dAmtRulD.length > 0) {
              updateFormData.dAmtRulD0 = dAmtRulD[0];
              if (dAmtRulD.length > 2) {
                updateFormData.dAmtRulDOpt0 = dAmtRulD[1];
                updateFormData.dAmtRulD1 = dAmtRulD[2];
                if (dAmtRulD.length > 4) {
                  updateFormData.dAmtRulDOpt1 = dAmtRulD[3];
                  updateFormData.dAmtRulD2 = dAmtRulD[4];
                }
              }
            }
          }
          if (updateFormData.dAmtRulE) {
            dAmtRulE = updateFormData.dAmtRulE.split(',');
            if (dAmtRulE.length > 0) {
              updateFormData.dAmtRulE0 = dAmtRulE[0];
              if (dAmtRulE.length > 2) {
                updateFormData.dAmtRulEOpt0 = dAmtRulE[1];
                updateFormData.dAmtRulE1 = dAmtRulE[2];
                if (dAmtRulE.length > 4) {
                  updateFormData.dAmtRulEOpt1 = dAmtRulE[3];
                  updateFormData.dAmtRulE2 = dAmtRulE[4];
                }
              }
            }
          }
          if (updateFormData.cAmtRulA) {
            cAmtRulA = updateFormData.cAmtRulA.split(',');
            if (cAmtRulA.length > 0) {
              updateFormData.cAmtRulA0 = cAmtRulA[0];
              if (cAmtRulA.length > 2) {
                updateFormData.cAmtRulAOpt0 = cAmtRulA[1];
                updateFormData.cAmtRulA1 = cAmtRulA[2];
                if (cAmtRulA.length > 4) {
                  updateFormData.cAmtRulAOpt1 = cAmtRulA[3];
                  updateFormData.cAmtRulA2 = cAmtRulA[4];
                }
              }
            }
          }
          if (updateFormData.cAmtRulB) {
            cAmtRulB = updateFormData.cAmtRulB.split(',');
            if (cAmtRulB.length > 0) {
              updateFormData.cAmtRulB0 = cAmtRulB[0];
              if (cAmtRulB.length > 2) {
                updateFormData.cAmtRulBOpt0 = cAmtRulB[1];
                updateFormData.cAmtRulB1 = cAmtRulB[2];
                if (cAmtRulB.length > 4) {
                  updateFormData.cAmtRulBOpt1 = cAmtRulB[3];
                  updateFormData.cAmtRulB2 = cAmtRulB[4];
                }
              }
            }
          }
          if (updateFormData.cAmtRulC) {
            cAmtRulC = updateFormData.cAmtRulC.split(',');
            if (cAmtRulC.length > 0) {
              updateFormData.cAmtRulC0 = cAmtRulC[0];
              if (cAmtRulC.length > 2) {
                updateFormData.cAmtRulCOpt0 = cAmtRulC[1];
                updateFormData.cAmtRulC1 = cAmtRulC[2];
                if (cAmtRulC.length > 4) {
                  updateFormData.cAmtRulCOpt1 = cAmtRulC[3];
                  updateFormData.cAmtRulC2 = cAmtRulC[4];
                }
              }
            }
          }
          if (updateFormData.cAmtRulD) {
            cAmtRulD = updateFormData.cAmtRulD.split(',');
            if (cAmtRulD.length > 0) {
              updateFormData.cAmtRulD0 = cAmtRulD[0];
              if (cAmtRulD.length > 2) {
                updateFormData.cAmtRulDOpt0 = cAmtRulD[1];
                updateFormData.cAmtRulD1 = cAmtRulD[2];
                if (cAmtRulD.length > 4) {
                  updateFormData.cAmtRulDOpt1 = cAmtRulD[3];
                  updateFormData.cAmtRulD2 = cAmtRulD[4];
                }
              }
            }
          }
          if (updateFormData.cAmtRulE) {
            cAmtRulE = updateFormData.cAmtRulE.split(',');
            if (cAmtRulE.length > 0) {
              updateFormData.cAmtRulE0 = cAmtRulE[0];
              if (cAmtRulE.length > 2) {
                updateFormData.cAmtRulEOpt0 = cAmtRulE[1];
                updateFormData.cAmtRulE1 = cAmtRulE[2];
                if (cAmtRulE.length > 4) {
                  updateFormData.cAmtRulEOpt1 = cAmtRulE[3];
                  updateFormData.cAmtRulE2 = cAmtRulE[4];
                }
              }
            }
          }
          newState = {
            ...state, updateFormData: updateFormData, updateModalVisible: !state.updateModalVisible, showSubjectTable: false,
            dSubjectKeys: dkey, cSubjectKeys: ckey,
          };
          break;
        case 'info':
          newState = { ...state, infoTableData: action.payload.data, infoModalVisible: !state.infoModalVisible };
          break;
        case 'subject':
          newState = { ...state, addFormData: action.payload.data, updateFormData: action.payload.data, showSubjectTable: !state.showSubjectTable };
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
      return { ...state, tableList: newTableList, updateFormSubmit: false, updateModalVisible: false, showSubjectTable: false };
    },
    /* ====== 对于基本Manage页面 以上基本状态更新方法不需要修改 额外状态更新方法添加在下方 ====== */
  },
};
