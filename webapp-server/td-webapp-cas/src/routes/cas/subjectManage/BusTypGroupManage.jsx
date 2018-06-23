import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import BusTypGroupQueryForm from '../../../components/business/cas/subjectManage/busTypGroup/BusTypGroupQueryForm';
import BusTypGroupPageTable from '../../../components/business/cas/subjectManage/busTypGroup/BusTypGroupPageTable'
import BusTypGroupInfoTable from '../../../components/business/cas/subjectManage/busTypGroup/BusTypGroupInfoTable';
import BusTypGroupInfoForm from '../../../components/business/cas/subjectManage/busTypGroup/BusTypGroupInfoForm';
import BusTypGroupAddForm from '../../../components/business/cas/subjectManage/busTypGroup/BusTypGroupAddForm';
import BusIdSubjectPageTable from '../../../components/business/cas/subjectManage/busTypGroup/BusIdSubjectPageTable';
import BusIdCancelForm from '../../../components/business/cas/subjectManage/busTypGroup/BusIdCancelForm';
import BusIdInfoUpdateForm from '../../../components/business/cas/subjectManage/busTypGroup/BusIdInfoUpdateForm';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const BusTypGroupManage = ({ dispatch, busTypGroupManage }) => {
  const objectid = 'groupId';
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
    addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage, addFormData,
    infoModalVisible, infoTableData, updateModalVisible, keys, busIds, busIdTableData, cancelModalVisible, busIdSubList,
    busTypData, updateBusIdModalVisible, isReset } = busTypGroupManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.busTypGroupManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'busTypGroupManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'busTypGroupManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'busTypGroupManage/deleteList',
            payload: { ids: selectIds.toString() },
          });
        });
      }
    },
  };
  const tableProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'busTypGroupManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'busTypGroupManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDisableClick(record) {
      dispatch({
        type: 'busTypGroupManage/queryBusIdSub',
        payload: { data: record },
      });
    },
    handleEnableClick(record) {
      if (record.busSts === '00') {
        callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
        return;
      }
      callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
        dispatch({
          type: 'busTypGroupManage/enableOne',
          payload: { ...record },
        });
      });
    },
    handleAddBusIdClick(record) {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'addBusId', data: record },
      });
    },
    handleUpdateBusIdClick(record) {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'updateBusId', data: record },
      });
    },
  };
  const infoModalProps = {
    width: 700,
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'info', data: {}, busTypData: {} },
      });
    },
  };
  const addModalProps = {
    width: 900,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'add', busTypData: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'update', data: {}, busTypData: {} },
      });
    },
  };
  const updateBusIdModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateBusIdModalVisible,
    onCancel: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'updateBusId', data: {}, busTypData: {} },
      });
    },
  };
  const updateBusIdFormProps = {
    sysInfoList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'busTypGroupManage/updateBusIdOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    sysInfoList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'busTypGroupManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    busTypData: busTypData,
    busIds: busIds,
    keys: keys,
    sysInfoList,
    submiting: addFormSubmit,
    data: addFormData,
    isReset,
    changeBusIds: (busIds, keys, opt) => {
      let id = 0;
      let keyArr = [0];
      if (opt === 'add') {
        id = busIds + 1;
        keyArr = keys.concat(id - 1);
      } else {
        id = busIds - 1;
        keyArr = keys;
      }
      dispatch({
        type: 'busTypGroupManage/updateState',
        payload: { busIds: id, keys: keyArr },
      });
    },
    changeResetFlag: () => {
      dispatch({
        type: 'busTypGroupManage/updateState',
        payload: { isReset: '0' },
      });
    },
    addFormSubmit: (dat) => {
      dispatch({
        type: 'busTypGroupManage/addOne',
        payload: { ...dat },
      });
    },
    showSubBusId() {
      dispatch({
        type: 'busTypGroupManage/updateState',
        payload: { subBusIdModalVisible: true },
      });
    },
  };

  const busIdTableProps = {
    hiddenBut: !!((busIdSubList && busIdSubList.length !== 0)),
    data: busIdTableData,
    cancelBusId: (dat) => {
      dispatch({
        type: 'busTypGroupManage/cancelBusId',
        payload: { ...dat },
      });
    },
  };

  const subTableProps = {
    tableList: busIdSubList,
    handleSubCancelClick(record) {
      callConfirm(commonMap.tip, bizMap.toCancelSub, () => {
        dispatch({
          type: 'busTypGroupManage/disableOne',
          payload: { record, busIdTableData },
        });
      });
    },
  }

  const cancelModalProps = {
    width: 900,
    footer: null,
    title: bizMap.busIdCancel,
    visible: cancelModalVisible,
    onCancel: () => {
      dispatch({
        type: 'busTypGroupManage/toggleModal',
        payload: { type: 'cancelBusId', data: {}, busTypData: {} },
      });
    },
  };

  //对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <BusTypGroupInfoForm {...updateFormProps} />;
  const UpdateBusIdFormGen = () => <BusIdInfoUpdateForm {...updateBusIdFormProps} />;
  // const AddFormGen = () => <BusTypGroupAddForm {...addFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <BusTypGroupQueryForm {...queryFormProps} />
        <BusTypGroupPageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <BusTypGroupInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...addModalProps}>
        <BusTypGroupAddForm {...addFormProps} />
      </Modal>
      <Modal {...cancelModalProps}>
        <BusIdCancelForm {...busIdTableProps} />
        <BusIdSubjectPageTable {...subTableProps} />
      </Modal>
      <Modal {...updateBusIdModalProps}>
        <UpdateBusIdFormGen />
      </Modal>
    </div>
  );
};

function mapStateToProps({ busTypGroupManage }) {
  return { busTypGroupManage };
}

export default connect(mapStateToProps)(BusTypGroupManage);
