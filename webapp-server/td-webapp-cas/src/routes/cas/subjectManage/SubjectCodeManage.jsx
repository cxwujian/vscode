import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import SubjectCodeQueryForm from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodeQueryForm';
import SubjectCodePageTable from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodePageTable'
import SubjectCodeInfoTable from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodeInfoTable';
import SubjectCodeInfoForm from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodeInfoForm';
import SubjectCodeCancelForm from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodeCancelForm';
import SubjectCodeAddForm from '../../../components/business/cas/subjectManage/subjectCode/SubjectCodeAddForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const SubjectCodeManage = ({ dispatch, subjectCodeManage }) => {
  const objectid = 'groupId';
  const bizMap = i18n.bizMap('cas/subject');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, updateFormSubmit, updateFormData,
    addFormSubmit, addModalVisible, sysInfoList, tableCurrentPage,
    infoModalVisible, infoTableData, updateModalVisible, cancelModalVisible, addFormData, subBusIdModalVisible, busData,
    ccyOptionsData } = subjectCodeManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.subjectCodeManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    sysInfoList,
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'subjectCodeManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'subjectCodeManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      const addData = {};
      console.log('tableSelects==', tableSelects)
      console.log('tableSelects.length==', tableSelects.length)
      if (tableSelects.length > 1) {
        callNotice(commonMap.warning, bizMap.addSubNotice2, 'warning');
      } else if (tableSelects.length === 1) {
        if (tableSelects[0].subSts === '01') {
          callNotice(commonMap.warning, bizMap.disableAddSubNotice, 'warning');
          return;
        }
        addData.accTyp = tableSelects[0].accTyp;
        addData.ccy = tableSelects[0].ccy;
        addData.subTyp = tableSelects[0].subTyp;
        const subjectLev = tableSelects[0].subjectLev;
        const subjectNme = tableSelects[0].subjectNme;
        if (subjectLev === '3') {
          callNotice(commonMap.warning, bizMap.addSubNotice, 'warning');
        } else {
          if (subjectLev === '1') {
            addData.subjectTwo = tableSelects[0].subject;
            addData.subjectLev = '2';
          } else if (subjectLev === '2') {
            addData.subjectThree = tableSelects[0].subject;
            addData.subjectLev = '3';
          }
          addData.subjectNme = subjectNme;
          dispatch({
            type: 'subjectCodeManage/toggleModal',
            payload: { type: 'add', addFormData: addData },
          });
        }
      } else {
        addData.subjectLev = '1';
        dispatch({
          type: 'subjectCodeManage/toggleModal',
          payload: { type: 'add', addFormData: addData },
        });
      }
    },
    del: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'subjectCodeManage/deleteList',
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
        type: 'subjectCodeManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'subjectCodeManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleEnableClick(record) {
      if (record.subSts === '00') {
        callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
        return;
      }
      callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
        dispatch({
          type: 'subjectCodeManage/enableOne',
          payload: { ...record },
        });
      });
    },
    handleSubCancelClick(record) {
      callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
        dispatch({
          type: 'subjectCodeManage/disableOne',
          payload: { ...record },
        });
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
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const addModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'add', addFormData: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
    submiting: updateFormSubmit,
    cancelSub: (dat) => {
      dispatch({
        type: 'subjectCodeManage/disableOne',
        payload: { ...dat },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    ccyOptionsData,
    sysInfoList,
    data: updateFormData,
    submiting: updateFormSubmit,
    formBaseSubmit: (dat) => {
      dispatch({
        type: 'subjectCodeManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const addFormProps = {
    ccyOptionsData,
    data: addFormData,
    sysInfoList,
    submiting: addFormSubmit,
    subBusIdModalVisible,
    busData,
    addFormSubmit: (dat) => {
      dispatch({
        type: 'subjectCodeManage/addOne',
        payload: { ...dat },
      });
    },
    onCancelSubBusIdModel() {
      dispatch({
        type: 'subjectCodeManage/updateState',
        payload: { subBusIdModalVisible: false },
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'subjectCodeManage/queryBusId',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    queryBusIdList(tableParam) {
      dispatch({
        type: 'subjectCodeManage/queryBusIdList',
        payload: { tableParam },
      });
    },
    subBusInfReset(dat) {
      dispatch({
        type: 'subjectCodeManage/updateState',
        payload: { addFormData: dat.addFormData, subBusIdModalVisible: dat.subBusIdModalVisible },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'subjectCodeManage/updateState',
        payload: { addFormData: dat },
      });
    },
  };
  const cancelModalProps = {
    footer: null,
    title: bizMap.subCancel,
    visible: cancelModalVisible,
    onCancel: () => {
      dispatch({
        type: 'subjectCodeManage/toggleModal',
        payload: { type: 'cancel', data: {} },
      });
    },
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <SubjectCodeInfoForm {...updateFormProps} />;

  return (
    <div>
      <Card {...cardProps}>
        <SubjectCodeQueryForm {...queryFormProps} />
        <SubjectCodePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <SubjectCodeInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...addModalProps}>
        <SubjectCodeAddForm {...addFormProps} />
      </Modal>
      <Modal {...cancelModalProps}>
        <SubjectCodeCancelForm {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ subjectCodeManage }) {
  return { subjectCodeManage };
}

export default connect(mapStateToProps)(SubjectCodeManage);
