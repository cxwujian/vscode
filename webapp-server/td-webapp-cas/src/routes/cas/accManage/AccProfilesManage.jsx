import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AccProfilesQueryForm from '../../../components/business/cas/accManage/accProfiles/AccProfilesQueryForm';
import AccProfilesPageTable from '../../../components/business/cas/accManage/accProfiles/AccProfilesPageTable';
import AccProfilesForm from '../../../components/business/cas/accManage/accProfiles/AccProfilesForm';
import AccSubProfilesForm from '../../../components/business/cas/accManage/accProfiles/AccSubProfilesForm';
import AccProfilesFrozenForm from '../../../components/business/cas/accManage/accProfiles/AccProfilesFrozenForm';
import AccProfilesHandleForm from '../../../components/business/cas/accManage/accProfiles/AccProfilesHandleForm';
import AccProfilesTable from '../../../components/business/cas/accManage/accProfiles/AccProfilesTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const AccProfilesManage = ({ dispatch, accProfilesManage }) => {
  const objectid = 'actNo';
  const bizMap = i18n.bizMap('cas/accProfiles');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    tableCurrentPage, infoModalVisible, infoTableData,
    subjectData, subjectModalVisible, cusData, cusModalVisible, chnModalVisible, chnData,
    frozenModalVisible, frozenFormData, frozenFormSubmit,
    selectRecord, handleTableCurrentPage, handleTableList, handleTableTotal, handleType, handleModalVisible, handleFormSubmit, handleExpandedRowKeys,
    ccyOptionsData, subAccCategoryDate, subAccCategoryDates,
    addSubModalVisible, addSubFormData,
  } = accProfilesManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.accProfilesManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    ccyOptionsData,
    advExpand,
    subjectData,
    subjectModalVisible,
    collapseClick: () => {
      dispatch({
        type: 'accProfilesManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'accProfilesManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      if (tableSelects.length === 0) {
        dispatch({
          type: 'accProfilesManage/toggleModal',
          payload: { type: 'add', data: {} },
        });
      } else if (tableSelects.length === 1) {
        if (tableSelects[0].accLevel === '3') {
          callNotice(commonMap.warning, bizMap.selectThreeNotice, 'warning');
          return;
        }
        if (!tableSelects[0].cusNo && tableSelects[0].chnOrgCod) {
          callNotice(commonMap.warning, bizMap.planNotHasChildNotice, 'warning');
          return;
        }
        dispatch({
          type: 'accProfilesManage/addSubInit',
          payload: { data: tableSelects[0] },
        });
      } else {
        callNotice(commonMap.warning, commonMap.selectOneOrNo, 'warning');
      }
    },
    enableClick: () => {
      if (tableSelects.length !== 1) {
        callNotice(commonMap.warning, commonMap.selectOne, 'warning');
      } else {
        const accSts = tableSelects[0].accSts;
        if (accSts === '00') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        if (accSts === '02') {
          callNotice(commonMap.warning, bizMap.childDisableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'accProfilesManage/updateStatus',
            payload: { ids: selectIds.toString(), accSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length !== 1) {
        callNotice(commonMap.warning, commonMap.selectOne, 'warning');
      } else {
        const accSts = tableSelects[0].accSts;
        if (accSts === '01') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'accProfilesManage/updateStatus',
            payload: { ids: selectIds.toString(), accSts: '01' },
          });
        });
      }
    },
    querySubjectList(tableParam) {
      const formdata = {};
      dispatch({
        type: 'accProfilesManage/querySubjectList',
        payload: { formdata, tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { subjectModalVisible: false },
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
        type: 'accProfilesManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleFrozenClick(record) {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'frozen', data: record },
      });
    },
    handleCancelAccountClick(record) {
      dispatch({
        type: 'accProfilesManage/subAccProfiles',
        payload: { data: record, changeVisible: true, handleTableParam: { currentPage: 1 } },
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
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  const addModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
  };
  const addSubModalProps = {
    width: 848,
    footer: null,
    title: commonMap.add,
    visible: addSubModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'addSub', data: {} },
      });
    },
  };
  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    type: 'add',
    subjectData,
    subjectModalVisible,
    cusData,
    cusModalVisible,
    chnData,
    chnModalVisible,
    data: addFormData,
    submiting: addFormSubmit,
    ccyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'accProfilesManage/addOne',
        payload: { ...dat },
      });
    },
    querySubjectList(formdata, tableParam) {
      dispatch({
        type: 'accProfilesManage/querySubjectList',
        payload: { formdata, tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { subjectModalVisible: false },
      });
    },
    queryCusList(formdata, tableParam) {
      dispatch({
        type: 'accProfilesManage/queryCusList',
        payload: { formdata, tableParam },
      });
    },
    onCancelCusModel() {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { cusModalVisible: false },
      });
    },
    queryChnList(formdata, tableParam) {
      dispatch({
        type: 'accProfilesManage/queryChnList',
        payload: { formdata, tableParam },
      });
    },
    onCancelChnModel() {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { chnModalVisible: false },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { addFormData: dat },
      });
    },
  };
  const addSubFormProps = {
    data: addSubFormData,
    submiting: addFormSubmit,
    subAccCategoryDate,
    subAccCategoryDates,
    formSubmit: (dat) => {
      dispatch({
        type: 'accProfilesManage/addSubOne',
        payload: { ...dat },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { addSubFormData: dat },
      });
    },
    cancelModel() {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'addSub', data: {} },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accProfilesManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const frozenModalProps = {
    width: 848,
    footer: null,
    title: bizMap.frozen,
    visible: frozenModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'frozen', data: {} },
      });
    },
  };
  const frozenFormProps = {
    type: 'frozen',
    data: frozenFormData,
    ccyOptionsData,
    submiting: frozenFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accProfilesManage/frozenOne',
        payload: { ...dat },
      });
    },
  };
  const handleModalProps = {
    width: 848,
    footer: null,
    title: bizMap.handle,
    visible: handleModalVisible,
    onCancel: () => {
      dispatch({
        type: 'accProfilesManage/toggleModal',
        payload: { type: 'updateList', data: { changeVisible: true } },
      });
    },
  };
  const handleFormProps = {
    handleType: handleType,
    handleFormSubmit,
    tableCurrentPage: handleTableCurrentPage,
    tableList: handleTableList,
    tableTotal: handleTableTotal,
    expandedRowKeys: handleExpandedRowKeys,
    selectRecord,
    tablePageChange(selectRecord, handleType, next) {
      dispatch({
        type: 'accProfilesManage/subAccProfiles',
        payload: { data: selectRecord, handleType, handleTableParam: { currentPage: next } },
      });
    },
    cancelAccountClick(record) {
      callConfirm(commonMap.tip, bizMap.cancelAccountConfirm, () => {
        dispatch({
          type: 'accProfilesManage/cancelAccount',
          payload: { record, data: selectRecord, handleTableParam: { currentPage: 1 } },
        });
      });
    },
    expandedRowsChange(expandedRows) {
      dispatch({
        type: 'accProfilesManage/updateState',
        payload: { handleExpandedRowKeys: expandedRows },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <AccProfilesForm {...updateFormProps} />;
  const FrozenFormGen = () => <AccProfilesFrozenForm {...frozenFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <AccProfilesQueryForm {...queryFormProps} />
        <AccProfilesPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AccProfilesForm {...addFormProps} />
      </Modal>
      <Modal {...addSubModalProps}>
        <AccSubProfilesForm {...addSubFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <AccProfilesTable {...infoTableProps} />
      </Modal>
      <Modal {...frozenModalProps}>
        <FrozenFormGen />
      </Modal>
      <Modal {...handleModalProps}>
        <AccProfilesHandleForm {...handleFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ accProfilesManage }) {
  return { accProfilesManage };
}

export default connect(mapStateToProps)(AccProfilesManage);
