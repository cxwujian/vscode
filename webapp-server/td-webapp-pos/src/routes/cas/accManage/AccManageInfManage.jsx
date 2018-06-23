import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import AccManageInfQueryForm from '../../../components/business/cas/accManage/accManageInf/AccManageInfQueryForm';
import AccManageInfPageTable from '../../../components/business/cas/accManage/accManageInf/AccManageInfPageTable';
import AccManageInfForm from '../../../components/business/cas/accManage/accManageInf/AccManageInfForm';
import AccManageInfTable from '../../../components/business/cas/accManage/accManageInf/AccManageInfTable';
import * as i18n from '../../../utils/i18n';

const AccManageInfManage = ({ dispatch, accManageInfManage }) => {
  const objectid = 'actNo';
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    tableCurrentPage, infoModalVisible, infoTableData,
    subjectData, subjectModalVisible, cusData, cusModalVisible,
    ccyOptionsData, accModeInfDate, subAccCategoryDates,
  } = accManageInfManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  const cardProps = {
    title: bizMap.accManageInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    advExpand,
    subjectData,
    subjectModalVisible,
    collapseClick: () => {
      dispatch({
        type: 'accManageInfManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'accManageInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'accManageInfManage/toggleModal',
        payload: { type: 'add', data: {} },
      });
    },
    querySubjectList(tableParam) {
      dispatch({
        type: 'accManageInfManage/querySubjectList',
        payload: { tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'accManageInfManage/updateState',
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
        type: 'accManageInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'accManageInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'accManageInfManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'accManageInfManage/toggleModal',
        payload: { type: 'info', data: record },
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
        type: 'accManageInfManage/toggleModal',
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
        type: 'accManageInfManage/toggleModal',
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
        type: 'accManageInfManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const addFormProps = {
    subAccCategoryDates,
    type: 'add',
    subjectData,
    subjectModalVisible,
    cusData,
    cusModalVisible,
    data: addFormData,
    submiting: addFormSubmit,
    ccyOptionsData,
    accModeInfDate,
    formSubmit: (dat) => {
      dispatch({
        type: 'accManageInfManage/addOne',
        payload: { ...dat },
      });
    },
    querySubjectList(formdata, tableParam) {
      dispatch({
        type: 'accManageInfManage/querySubjectList',
        payload: { formdata, tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'accManageInfManage/updateState',
        payload: { subjectModalVisible: false },
      });
    },
    queryCusList(formdata, tableParam) {
      dispatch({
        type: 'accManageInfManage/queryCusList',
        payload: { formdata, tableParam },
      });
    },
    onCancelCusModel() {
      dispatch({
        type: 'accManageInfManage/updateState',
        payload: { cusModalVisible: false },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accManageInfManage/updateState',
        payload: { addFormData: dat },
      });
    },
  };
  const updateFormProps = {
    subAccCategoryDates,
    type: 'update',
    data: updateFormData,
    accModeInfDate,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'accManageInfManage/updateOne',
        payload: { ...dat },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <AccManageInfForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <AccManageInfQueryForm {...queryFormProps} />
        <AccManageInfPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AccManageInfForm {...addFormProps} />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <AccManageInfTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ accManageInfManage }) {
  return { accManageInfManage };
}

export default connect(mapStateToProps)(AccManageInfManage);
