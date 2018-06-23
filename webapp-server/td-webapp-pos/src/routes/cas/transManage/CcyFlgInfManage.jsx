import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CcyFlgInfQueryForm from '../../../components/business/cas/transManage/ccyFlgInf/CcyFlgInfQueryForm';
import CcyFlgInfPageTable from '../../../components/business/cas/transManage/ccyFlgInf/CcyFlgInfPageTable';
import CcyFlgInfForm from '../../../components/business/cas/transManage/ccyFlgInf/CcyFlgInfForm';
import * as i18n from '../../../utils/i18n';

const CcyFlgInfManage = ({ dispatch, ccyFlgInfManage }) => {
  const bizMap = i18n.bizMap('cas/ccyFlgInf');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
  } = ccyFlgInfManage;
  const cardProps = {
    title: bizMap.ccyFlgInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'ccyFlgInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'ccyFlgInfManage/toggleModal',
        payload: { type: 'add' },
      })
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
        type: 'ccyFlgInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'ccyFlgInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'ccyFlgInfManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'ccyFlgInfManage/toggleModal',
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
        type: 'ccyFlgInfManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'ccyFlgInfManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    type: 'update',
    formSubmit: (dat) => {
      dispatch({
        type: 'ccyFlgInfManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <CcyFlgInfForm {...addFormProps} />;
  const UpdateFormGen = () => <CcyFlgInfForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <CcyFlgInfQueryForm {...queryFormProps} />
        <CcyFlgInfPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ ccyFlgInfManage }) {
  return { ccyFlgInfManage };
}

export default connect(mapStateToProps)(CcyFlgInfManage);
