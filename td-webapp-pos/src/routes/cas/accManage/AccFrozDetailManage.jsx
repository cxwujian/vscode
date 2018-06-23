import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AccFrozDetailQueryForm from '../../../components/business/cas/accManage/accFrozDetail/AccFrozDetailQueryForm';
import AccFrozDetailPageTable from '../../../components/business/cas/accManage/accFrozDetail/AccFrozDetailPageTable';
import AccFrozDetailForm from '../../../components/business/cas/accManage/accFrozDetail/AccFrozDetailForm';
import AccFrozHandleInfPageTableForm from '../../../components/business/cas/accManage/accFrozDetail/AccFrozHandleInfPageTableForm';
import AccFrozDetailTable from '../../../components/business/cas/accManage/accFrozDetail/AccFrozDetailTable';
import * as i18n from '../../../utils/i18n';

const AccFrozDetailManage = ({ dispatch, accFrozDetailManage }) => {
  const objectid = 'pkId';
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects, tableCurrentPage,
    updateModalVisible, updateFormSubmit, updateFormData,
    handleModalVisible, handleFormData, handleFormSubmit,
    handleTableLoading, handleTableList, handleTableTotal, handleTableCurrentPage,
    infoTableData, infoModalVisible, advExpand,
  } = accFrozDetailManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.AccFrozDetailInfoManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'accFrozDetailManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'accFrozDetailManage/toggleAdvExpand',
      });
    },
    exportClick: (dat) => {
      dispatch({
        type: 'accFrozDetailManage/exportList',
        payload: { ...dat },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tablePageChange(next) {
      dispatch({
        type: 'accFrozDetailManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'accFrozDetailManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'accFrozDetailManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'accFrozDetailManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleHandleInfListClick(record) {
      dispatch({
        type: 'accFrozDetailManage/accFrozDetailInit',
        payload: { handleFormData: record, handleTableParam: { currentPage: 1, ...record.busCde }, changeVisible: true },
      });
    },
  };
  const updateModalProps = {
    width: 848,
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accFrozDetailManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const handleModalProps = {
    width: 848,
    footer: null,
    title: bizMap.handleleInf,
    visible: handleModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accFrozDetailManage/toggleModal',
        payload: { type: 'detail', data: {} },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accFrozDetailManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const handleFormProps = {
    handleFormData,
    tableList: handleTableList,
    tableLoading: handleTableLoading,
    tableTotal: handleTableTotal,
    tableCurrentPage: handleTableCurrentPage,
    submiting: handleFormSubmit,
    tablePageChange(next, handleFormData) {
      dispatch({
        type: 'accFrozDetailManage/accFrozDetailInit',
        payload: { handleFormData, handleTableParam: { currentPage: next, ...handleFormData } },
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
        type: 'accFrozDetailManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <AccFrozDetailForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <AccFrozDetailQueryForm {...queryFormProps} />
        <AccFrozDetailPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <AccFrozDetailTable {...infoTableProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...handleModalProps}>
        <AccFrozHandleInfPageTableForm {...handleFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ accFrozDetailManage }) {
  return { accFrozDetailManage };
}

export default connect(mapStateToProps)(AccFrozDetailManage);
