import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AccEntryRulesQueryForm from '../../../components/business/cas/transManage/accEntryRulesInf/AccEntryRulesQueryForm';
import AccEntryRulesPageTable from '../../../components/business/cas/transManage/accEntryRulesInf/AccEntryRulesPageTable';
import AccEntryRulesInfoForm from '../../../components/business/cas/transManage/accEntryRulesInf/AccEntryRulesInfoForm';
import AccEntryRulesTable from '../../../components/business/cas/transManage/accEntryRulesInf/AccEntryRulesTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AccEntryRulesInfManage = ({ dispatch, accEntryRulesInfManage }) => {
  const objectid = 'entryId';
  const bizMap = i18n.bizMap('cas/accEntryRulesInf');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData, infoModalVisible, infoTableData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage,
    showSubjectTable, ccyOptionsData, amtRulOptionsData,
    dSubjectKeys, cSubjectKeys,
  } = accEntryRulesInfManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.accEntryRulesInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'accEntryRulesInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const entSts = tableSelects[0].entSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (entSts !== tableSelects[i].entSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].entSts !== '01' && tableSelects[i].entSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (entSts === '00') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'accEntryRulesInfManage/updateStatus',
            payload: { ids: selectIds.toString(), entSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const entSts = tableSelects[0].entSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (entSts !== tableSelects[i].entSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].entSts !== '01' && tableSelects[i].entSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (entSts === '01') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'accEntryRulesInfManage/updateStatus',
            payload: { ids: selectIds.toString(), entSts: '01' },
          });
        });
      }
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'accEntryRulesInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'accEntryRulesInfManage/deleteOne',
          payload: { ...record },
        });
      });
    },
    handleMatchEntryClick(record) {
      dispatch({
        type: 'accEntryRulesInfManage/matchEntryInit',
        payload: { data: record },
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    width: 1000,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    width: 1000,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    dSubjectKeys,
    cSubjectKeys,
    showSubjectTable,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    ccyOptionsData,
    amtRulOptionsData,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accEntryRulesInfManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'accEntryRulesInfManage/querySubjectList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    toggleSubjectTable(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    querySubjectList(dat) {
      dispatch({
        type: 'accEntryRulesInfManage/querySubjectList',
        payload: { miniFormTableParam: { ...dat, isLastLev: '1', subSts: '00', currentPage: 1 } },
      });
    },
    changeDSubjectKeys(value) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { dSubjectKeys: value },
      });
    },
    changeCSubjectKeys(value) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { cSubjectKeys: value },
      });
    },
    changeFormValue(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { addFormData: formData },
      });
    },
  };
  const updateFormProps = {
    dSubjectKeys,
    cSubjectKeys,
    showSubjectTable,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    ccyOptionsData,
    amtRulOptionsData,
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'accEntryRulesInfManage/updateOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'accEntryRulesInfManage/querySubjectList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    rowClickCallback(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    toggleSubjectTable(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    querySubjectList(dat) {
      dispatch({
        type: 'accEntryRulesInfManage/querySubjectList',
        payload: { miniFormTableParam: { ...dat, isLastLev: '1', subSts: '00', currentPage: 1 } },
      });
    },
    changeDSubjectKeys(value) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { dSubjectKeys: value },
      });
    },
    changeCSubjectKeys(value) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { cSubjectKeys: value },
      });
    },
    changeFormValue(formData) {
      dispatch({
        type: 'accEntryRulesInfManage/updateState',
        payload: { addFormData: formData },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <AccEntryRulesQueryForm {...queryFormProps} />
        <AccEntryRulesPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AccEntryRulesInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <AccEntryRulesInfoForm {...updateFormProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <AccEntryRulesTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ accEntryRulesInfManage }) {
  return { accEntryRulesInfManage };
}

export default connect(mapStateToProps)(AccEntryRulesInfManage);
