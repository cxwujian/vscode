import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AccModeInfQueryForm from '../../../components/business/cas/accManage/accModeInf/AccModeInfQueryForm';
import AccModeInfPageTable from '../../../components/business/cas/accManage/accModeInf/AccModeInfPageTable';
import AccModeInfForm from '../../../components/business/cas/accManage/accModeInf/AccModeInfForm';
import AccModeInfTable from '../../../components/business/cas/accManage/accModeInf/AccModeInfTable';
import AccModeInfDeleteForm from '../../../components/business/cas/accManage/accModeInf/AccModeInfDeleteForm';
import AccManageInfPageForm from '../../../components/business/cas/accManage/accModeInf/AccManageInfPageForm';

import * as i18n from '../../../utils/i18n';

const AccModeInfManage = ({ dispatch, accModeInfManage }) => {
  const objectid = 'mode';
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData,
    timKeys, timVals, uuid, addFormData,
    tableRecord, deleteFormSubmit, manageInfRecord, miniFormVisible,
    accManageInfTableParam, accManageInfTableLoading, accManageInfTableList, accManageInfTableTotal, accManageInfTableCurrentPage, accManageInfModalVisible,

  } = accModeInfManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.accModeInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'accModeInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'accModeInfManage/toggleModal',
        payload: { type: 'add' },
      });
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
        type: 'accModeInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'accModeInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'accModeInfManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      dispatch({
        type: 'accModeInfManage/deleteInit',
        payload: { record, changeVisible: true, accManageInfTableParam: { currentPage: 1, modeId: record.modeId } },
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
        type: 'accModeInfManage/toggleModal',
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
        type: 'accModeInfManage/toggleModal',
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
        type: 'accModeInfManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };

  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'accModeInfManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accModeInfManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const accManageInfModalProps = {
    width: 848,
    footer: null,
    title: bizMap.matchEntry,
    visible: accManageInfModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accModeInfManage/toggleModal',
        payload: { type: 'accManageInf', record: {} },
      });
    },
  };
  const accManageInfFormProps = {
    manageInfRecord,
    miniFormVisible,
    tableList: accManageInfTableList,
    tableLoading: accManageInfTableLoading,
    tableTotal: accManageInfTableTotal,
    tableCurrentPage: accManageInfTableCurrentPage,
    submiting: updateFormSubmit,
    handleSelectedClick: (pkId) => {
      dispatch({
        type: 'accModeInfManage/updateOneEntryRule',
        payload: { pkId },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'accModeInfManage/deleteInit',
        payload: { accManageInfTableParam: { ...accManageInfTableParam, currentPage: next } },
      });
    },
    handleEditModeClick(record) {
      dispatch({
        type: 'accModeInfManage/updateState',
        payload: { manageInfRecord: record, miniFormVisible: true },
      });
    },
    manageInfFormSubmit(record) {
      dispatch({
        type: 'accModeInfManage/updateManageInf',
        payload: { record: record, tableRecord },
      });
    },
    popoverOncancel() {
      dispatch({
        type: 'accModeInfManage/updateState',
        payload: { miniFormVisible: false },
      });
    },
  };
  const deleteFormProps = {
    data: tableRecord,
    submiting: deleteFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accModeInfManage/deleteOne',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <AccModeInfForm {...addFormProps} />;
  const UpdateFormGen = () => <AccModeInfForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <AccModeInfQueryForm {...queryFormProps} />
        <AccModeInfPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <AccModeInfTable {...infoTableProps} />
      </Modal>
      <Modal {...accManageInfModalProps}>
        <AccModeInfDeleteForm {...deleteFormProps} />
        <AccManageInfPageForm {...accManageInfFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ accModeInfManage }) {
  return { accModeInfManage };
}

export default connect(mapStateToProps)(AccModeInfManage);
