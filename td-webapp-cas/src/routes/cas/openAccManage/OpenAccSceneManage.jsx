import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import OpenAccSceneQueryForm from '../../../components/business/cas/openAccManage/openAccScene/OpenAccSceneQueryForm';
import OpenAccScenePageTable from '../../../components/business/cas/openAccManage/openAccScene/OpenAccScenePageTable';
import OpenAccSceneInfoForm from '../../../components/business/cas/openAccManage/openAccScene/OpenAccSceneInfoForm';
import OpenAccSceneInfoTable from '../../../components/business/cas/openAccManage/openAccScene/OpenAccSceneInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const OpenAccSceneManage = ({ dispatch, openAccSceneManage }) => {
  const bizMap = i18n.bizMap('cas/openAcc');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    infoModalVisible, infoTableData, cateIdOptionsData,
    miniFormTableParam, miniFormTableLoading, miniFormTableList, miniFormTableTotal, miniFormTableCurrentPage,
    showSubjectTable, subjectKeys, subjectVals,
  } = openAccSceneManage;
  const sceneIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const sceneId = typeof tableSelects[i] === 'object' ? tableSelects[i].sceneId : tableSelects[i];
    sceneIds.push(sceneId);
  }
  const cardProps = {
    title: bizMap.openAccSceneManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'openAccSceneManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, bizMap.onlyOne, 'warning');
      } else {
        const sceSts = tableSelects[0].sceSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (sceSts !== tableSelects[i].sceSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].sceSts !== '01' && tableSelects[i].sceSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (sceSts === '00') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.enableConfirm, () => {
          dispatch({
            type: 'openAccSceneManage/updateStatus',
            payload: { sceneIds: sceneIds.toString(), sceSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const sceSts = tableSelects[0].sceSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (sceSts !== tableSelects[i].sceSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].sceSts !== '01' && tableSelects[i].sceSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (sceSts === '01') {
          callNotice(commonMap.warning, bizMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, bizMap.disableConfirm, () => {
          dispatch({
            type: 'openAccSceneManage/updateStatus',
            payload: { sceneIds: sceneIds.toString(), sceSts: '01' },
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
        type: 'openAccSceneManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'openAccSceneManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'openAccSceneManage/deleteOne',
          payload: { ...record },
        });
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 615,
    onCancel: () => {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    cateIdOptionsData,
    subjectKeys,
    subjectVals,
    showSubjectTable,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'openAccSceneManage/addOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'openAccSceneManage/querySubjectList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    toggleSubjectTable(formData) {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    querySubjectList(dat) {
      dispatch({
        type: 'openAccSceneManage/querySubjectList',
        payload: { miniFormTableParam: { ...dat, isLastLev: '1', subSts: '00', currentPage: 1 } },
      });
    },
    changeSubjectKeys(value) {
      dispatch({
        type: 'openAccSceneManage/updateState',
        payload: { subjectKeys: value },
      });
    },
    changeSubjectVals(value) {
      dispatch({
        type: 'openAccSceneManage/updateState',
        payload: { subjectVals: value },
      });
    },
  };
  const updateFormProps = {
    cateIdOptionsData,
    subjectKeys,
    subjectVals,
    showSubjectTable,
    tableList: miniFormTableList,
    tableLoading: miniFormTableLoading,
    tableTotal: miniFormTableTotal,
    tableCurrentPage: miniFormTableCurrentPage,
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'openAccSceneManage/updateOne',
        payload: { ...dat },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'openAccSceneManage/querySubjectList',
        payload: { miniFormTableParam: { ...miniFormTableParam, currentPage: next } },
      });
    },
    toggleSubjectTable(formData) {
      dispatch({
        type: 'openAccSceneManage/toggleModal',
        payload: { type: 'subject', data: formData },
      });
    },
    querySubjectList(dat) {
      dispatch({
        type: 'openAccSceneManage/querySubjectList',
        payload: { miniFormTableParam: { ...dat, isLastLev: '1', subSts: '00', currentPage: 1 } },
      });
    },
    changeSubjectKeys(value) {
      dispatch({
        type: 'openAccSceneManage/updateState',
        payload: { subjectKeys: value },
      });
    },
    changeSubjectVals(value) {
      dispatch({
        type: 'openAccSceneManage/updateState',
        payload: { subjectVals: value },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <OpenAccSceneQueryForm {...queryFormProps} />
        <OpenAccScenePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <OpenAccSceneInfoForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <OpenAccSceneInfoForm {...updateFormProps} />
      </Modal>
      <Modal {...infoModalProps}>
        <OpenAccSceneInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ openAccSceneManage }) {
  return { openAccSceneManage };
}

export default connect(mapStateToProps)(OpenAccSceneManage);
