import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AmtCdeInfQueryForm from '../../../components/business/cas/transManage/amtCdeInf/AmtCdeInfQueryForm';
import AmtCdeInfPageTable from '../../../components/business/cas/transManage/amtCdeInf/AmtCdeInfPageTable';
import AmtCdeInfForm from '../../../components/business/cas/transManage/amtCdeInf/AmtCdeInfForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AmtCdeInfManage = ({ dispatch, amtCdeInfManage }) => {
  const objectid = 'amtCde';
  const bizMap = i18n.bizMap('cas/amtCdeInf');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
  } = amtCdeInfManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.amtCdeInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'amtCdeInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'amtCdeInfManage/toggleModal',
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
        type: 'amtCdeInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'amtCdeInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'amtCdeInfManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'amtCdeInfManage/deleteOne',
          payload: { ...record },
        });
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].areaStatus === '1') {
            callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, bizMap.deleteConfirm, () => {
          dispatch({
            type: 'amtCdeInfManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'amtCdeInfManage/toggleModal',
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
        type: 'amtCdeInfManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'amtCdeInfManage/addOne',
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
        type: 'amtCdeInfManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <AmtCdeInfForm {...addFormProps} />;
  const UpdateFormGen = () => <AmtCdeInfForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <AmtCdeInfQueryForm {...queryFormProps} />
        <AmtCdeInfPageTable {...tableProps} />
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

function mapStateToProps({ amtCdeInfManage }) {
  return { amtCdeInfManage };
}

export default connect(mapStateToProps)(AmtCdeInfManage);
