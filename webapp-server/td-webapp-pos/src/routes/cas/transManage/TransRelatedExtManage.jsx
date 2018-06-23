import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TransRelatedExtQueryForm from '../../../components/business/cas/transManage/transRelatedExt/TransRelatedExtQueryForm';
import TransRelatedExtPageTable from '../../../components/business/cas/transManage/transRelatedExt/TransRelatedExtPageTable';
import TransRelatedExtForm from '../../../components/business/cas/transManage/transRelatedExt/TransRelatedExtForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TransRelatedExtManage = ({ dispatch, transRelatedExtManage }) => {
  const objectid = 'extCod';
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
  } = transRelatedExtManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.transRelatedExtManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'transRelatedExtManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'transRelatedExtManage/toggleModal',
        payload: { type: 'add' },
      })
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const extSts = tableSelects[0].extSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (extSts !== tableSelects[i].extSts) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
        }
        if (extSts === '00') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'transRelatedExtManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), extSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const extSts = tableSelects[0].extSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (extSts !== tableSelects[i].extSts) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
        }
        if (extSts === '01') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'transRelatedExtManage/updateStatus',
            payload: { tableParam: { ...tableParam, currentPage: 1 }, ids: selectIds.toString(), extSts: '01' },
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
        type: 'transRelatedExtManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'transRelatedExtManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'transRelatedExtManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      if (record.extSts === '00') {
        callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
        return;
      }
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'transRelatedExtManage/deleteOne',
          payload: { ...record },
        });
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transRelatedExtManage/toggleModal',
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
        type: 'transRelatedExtManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'transRelatedExtManage/addOne',
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
        type: 'transRelatedExtManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <TransRelatedExtForm {...addFormProps} />;
  const UpdateFormGen = () => <TransRelatedExtForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <TransRelatedExtQueryForm {...queryFormProps} />
        <TransRelatedExtPageTable {...tableProps} />
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

function mapStateToProps({ transRelatedExtManage }) {
  return { transRelatedExtManage };
}

export default connect(mapStateToProps)(TransRelatedExtManage);
