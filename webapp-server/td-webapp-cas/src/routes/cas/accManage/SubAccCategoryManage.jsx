import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import SubAccCategoryQueryForm from '../../../components/business/cas/accManage/subAccCategory/SubAccCategoryQueryForm';
import SubAccCategoryPageTable from '../../../components/business/cas/accManage/subAccCategory/SubAccCategoryPageTable';
import SubAccCategoryForm from '../../../components/business/cas/accManage/subAccCategory/SubAccCategoryForm';
import SubAccCategoryDeleteForm from '../../../components/business/cas/accManage/subAccCategory/SubAccCategoryDeleteForm';
import ProfilesPageTableForm from '../../../components/business/cas/accManage/subAccCategory/ProfilesPageTableForm';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const SubAccCategoryManage = ({ dispatch, subAccCategoryManage }) => {
  const objectid = 'cateId';
  const bizMap = i18n.bizMap('cas/subAccCategory');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableSelects, tableCurrentPage,
    addModalVisible, updateModalVisible, addFormSubmit, updateFormSubmit, addFormData, updateFormData,
    deleteModalVisible, deleteFormData, deleteFormSubmit, hasProfiles,
    profilesTableLoading, profilesTableList, profilesTableTotal, profilesableCurrentPage,
  } = subAccCategoryManage;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.subAccCategoryInfoManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'subAccCategoryManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'subAccCategoryManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'subAccCategoryManage/deleteList',
            payload: { ids: selectIds.toString() },
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
    tablePageChange(next) {
      dispatch({
        type: 'subAccCategoryManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'subAccCategoryManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'subAccCategoryManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      dispatch({
        type: 'subAccCategoryManage/subAccCategoryDelInit',
        payload: { deleteFormData: record, profilesTableParam: { currentPage: 1, ...record }, changeVisible: true },
      });
    },
  };
  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'subAccCategoryManage/toggleModal',
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
        type: 'subAccCategoryManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const deleteModalProps = {
    width: 848,
    footer: null,
    title: bizMap.delete,
    visible: deleteModalVisible,
    onCancel: () => {
      dispatch({
        type: 'subAccCategoryManage/toggleModal',
        payload: { type: 'delete', data: {} },
      });
    },
  };
  const addFormProps = {
    data: addFormData,
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'subAccCategoryManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const updateFormProps = {
    type: 'update',
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'subAccCategoryManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const deleteFormProps = {
    hasProfiles,
    data: deleteFormData,
    submiting: deleteFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'subAccCategoryManage/deleteOne',
        payload: { ...dat },
      });
    },
  };
  const profilesFormProps = {
    deleteFormData,
    tableList: profilesTableList,
    tableLoading: profilesTableLoading,
    tableTotal: profilesTableTotal,
    tableCurrentPage: profilesableCurrentPage,
    submiting: deleteFormSubmit,
    handleCancelAccountClick: (dat) => {
      dispatch({
        type: 'subAccCategoryManage/cancelAccount',
        payload: { ...dat, deleteFormData },
      });
    },
    tablePageChange(next, deleteFormData) {
      dispatch({
        type: 'subAccCategoryManage/subAccCategoryDelInit',
        payload: { deleteFormData, profilesTableParam: { currentPage: next, ...deleteFormData } },
      });
    },
  };

  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const AddFormGen = () => <SubAccCategoryForm {...addFormProps} />;
  const UpdateFormGen = () => <SubAccCategoryForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <SubAccCategoryQueryForm {...queryFormProps} />
        <SubAccCategoryPageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...deleteModalProps}>
        <SubAccCategoryDeleteForm {...deleteFormProps} />
        <ProfilesPageTableForm {...profilesFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ subAccCategoryManage }) {
  return { subAccCategoryManage };
}

export default connect(mapStateToProps)(SubAccCategoryManage);
