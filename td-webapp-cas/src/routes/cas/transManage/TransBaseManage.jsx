import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import TransBaseQueryForm from '../../../components/business/cas/transManage/transBase/TransBaseQueryForm';
import TransBasePageTable from '../../../components/business/cas/transManage/transBase/TransBasePageTable';
import TransBaseForm from '../../../components/business/cas/transManage/transBase/TransBaseForm';
import TransSubCodeForm from '../../../components/business/cas/transManage/transBase/TransSubCodeForm';
import TransSubCodeTable from '../../../components/business/cas/transManage/transBase/TransSubCodeTable';
import EntryRulesQueryForm from '../../../components/business/cas/transManage/transBase/entryRules/EntryRulesQueryForm';
import EntryRulesInfPageForm from '../../../components/business/cas/transManage/transBase/entryRules/EntryRulesInfPageForm';
import SubRelatedExtQueryForm from '../../../components/business/cas/transManage/transBase/subRelatedExt/SubRelatedExtQueryForm';
import SubRelatedExtPageForm from '../../../components/business/cas/transManage/transBase/subRelatedExt/SubRelatedExtPageForm';

import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const TransBaseManage = ({ dispatch, transBaseManage }) => {
  const objectid = 'txnCode';
  const bizMap = i18n.bizMap('cas/transaction');
  const commonMap = i18n.commonMap();

  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, tableCurrentPage,
    updateModalVisible, addModalVisible, addFormSubmit, updateFormData, updateFormSubmit,
    addFormData, addSubModalVisible, addSubFormSubmit,
    updateSubFormData, updateSubModalVisible, updateSubFormSubmit,
    infoSubModalVisible, infoSubTableData, codeTableRecord,
    entryRulesTableParam, entryRulesTableLoading, entryRulesTableList, entryRulesTableTotal, entryRulesTableCurrentPage, entryRulesModalVisible,
    subRelatedExtTableParam, subRelatedExtTableLoading, subRelatedExtTableList, subRelatedExtTableTotal, subRelatedExtTableCurrentPage, subRelatedExtModalVisible,
  } = transBaseManage;

  const selectIds = [];
  const subCods = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
    const selectSubCod = typeof tableSelects[i] === 'object' ? tableSelects[i].subCod : tableSelects[i];
    subCods.push(selectSubCod);
  }

  const cardProps = {
    title: bizMap.transBase,
    style: { width: '100%' },
  };

  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'transBaseManage/toggleAdvExpand',
      });
    },
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (!tableSelects[i].subCod) {
            callNotice(commonMap.warning, bizMap.enableNotice, 'warning');
            return;
          }
          if (tableSelects[i].txnSts === '00') {
            callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'transBaseManage/updateStatus',
            payload: { txnCodes: selectIds.toString(), subCods: subCods.toString(), txnSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        for (let i = 0; i < tableSelects.length; i++) {
          if (!tableSelects[i].subCod) {
            callNotice(commonMap.warning, bizMap.enableNotice, 'warning');
            return;
          }
          if (tableSelects[i].txnSts === '01') {
            callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'transBaseManage/updateStatus',
            payload: { txnCodes: selectIds.toString(), subCods: subCods.toString(), txnSts: '01' },
          });
        });
      }
    },
    addOne: () => {
      if (tableSelects.length === 0) {
        dispatch({
          type: 'transBaseManage/toggleModal',
          payload: { type: 'add' },
        });
      } else if (tableSelects.length === 1) {
        if (tableSelects[0].subCod) {
          callNotice(commonMap.warning, bizMap.selectBaseCode, 'warning');
          return;
        }
        dispatch({
          type: 'transBaseManage/toggleModal',
          payload: { type: 'addSub', data: tableSelects[0] },
        });
      } else {
        callNotice(commonMap.warning, commonMap.selectOneOrNo, 'warning');
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
        type: 'transBaseManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'transBaseManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
    handleDeleteClick(record) {
      if (record.hasChildren) {
        callNotice(commonMap.warning, bizMap.hasChildrenErr, 'warning');
      } else {
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'transBaseManage/deleteOne',
            payload: { ...record },
          });
        });
      }
    },
    handleSubUpdateClick(record) {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'updateSub', data: record },
      });
    },
    handleSubDeleteClick(record) {
      callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
        dispatch({
          type: 'transBaseManage/deleteSubOne',
          payload: { ...record },
        });
      });
    },
    handleSubDetailClick(record) {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'detailSub', data: record },
      });
    },
    handleMatchEntryClick(record) {
      if (record.extCod && (record.extCod === 'adjust' || record.extCod === 'cancle')) {
        callNotice(commonMap.warning, bizMap.matchEntryErr, 'warning');
        return;
      }
      dispatch({
        type: 'transBaseManage/matchEntryInit',
        payload: { record, changeVisible: true, entryRulesTableParam: { currentPage: 1 } },
      });
    },
    handleMatchExCodeClick(record) {
      dispatch({
        type: 'transBaseManage/matchSubRelatedExtInit',
        payload: { record, changeVisible: true, subRelatedExtTableParam: { currentPage: 1 } },
      });
    },
  };


  const addModalProps = {
    footer: null,
    title: commonMap.add,
    visible: addModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'add' },
      });
    },
  };
  const addSubModalProps = {
    footer: null,
    title: bizMap.addSub,
    visible: addSubModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'addSub' },
      });
    },
  };

  const addFormProps = {
    submiting: addFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/addOne',
        payload: { ...dat },
      });
    },
  };
  const addSubFormProps = {
    data: addFormData,
    submiting: addSubFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/addSubOne',
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
        type: 'transBaseManage/updateOne',
        payload: { ...dat },
      });
    },
  };
  const updateSubFormProps = {
    type: 'update',
    data: updateSubFormData,
    submiting: updateSubFormSubmit,
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/updateSubOne',
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
        type: 'transBaseManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateSubModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateSubModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'updateSub', data: {} },
      });
    },
  };

  const infoSubTableProps = {
    data: infoSubTableData,
  };

  const infoSubModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoSubModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'detailSub', data: {} },
      });
    },
  };

  const entryRulesQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/matchEntryInit',
        payload: { record: codeTableRecord, entryRulesTableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const entryRulesModalProps = {
    width: 848,
    footer: null,
    title: bizMap.matchEntry,
    visible: entryRulesModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'entryRules', record: {} },
      });
    },
  };
  const entryRulesFormProps = {
    codeTableRecord,
    tableList: entryRulesTableList,
    tableLoading: entryRulesTableLoading,
    tableTotal: entryRulesTableTotal,
    tableCurrentPage: entryRulesTableCurrentPage,
    submiting: updateFormSubmit,
    handleSelectedClick: (codeTableRecord, record) => {
      const data = codeTableRecord;
      data.entryId = record.entryId;
      data.entryDesc = record.entryDesc;
      dispatch({
        type: 'transBaseManage/updateOneEntryRule',
        payload: { ...data },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'transBaseManage/matchEntryInit',
        payload: { record: codeTableRecord, entryRulesTableParam: { ...entryRulesTableParam, currentPage: next } },
      });
    },
  };
  const subRelatedExtQueryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'transBaseManage/matchSubRelatedExtInit',
        payload: { record: codeTableRecord, subRelatedExtTableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const subRelatedExtModalProps = {
    width: 848,
    footer: null,
    title: bizMap.matchExCode,
    visible: subRelatedExtModalVisible,
    onCancel: () => {
      dispatch({
        type: 'transBaseManage/toggleModal',
        payload: { type: 'subRelatedExt', record: {} },
      });
    },
  };
  const subRelatedExtFormProps = {
    codeTableRecord,
    tableList: subRelatedExtTableList,
    tableLoading: subRelatedExtTableLoading,
    tableTotal: subRelatedExtTableTotal,
    tableCurrentPage: subRelatedExtTableCurrentPage,
    submiting: updateFormSubmit,
    handleSelectedClick: (codeTableRecord, record) => {
      const data = codeTableRecord;
      data.extCod = record.extCod;
      data.extDesc = record.extDesc;
      dispatch({
        type: 'transBaseManage/updateOneSubRelatedExt',
        payload: { ...data },
      });
    },
    tablePageChange(next) {
      dispatch({
        type: 'transBaseManage/matchSubRelatedExtInit',
        payload: { record: codeTableRecord, subRelatedExtTableParam: { ...subRelatedExtTableParam, currentPage: next } },
      });
    },
  };

  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <TransBaseForm {...updateFormProps} />;
  const AddFormGen = () => <TransBaseForm {...addFormProps} />;
  const SubUpdateFormGen = () => <TransSubCodeForm {...updateSubFormProps} />;
  const SubAddFormGen = () => <TransSubCodeForm {...addSubFormProps} />;


  return (
    <div>
      <Card {...cardProps}>
        <TransBaseQueryForm {...queryFormProps} />
        <TransBasePageTable {...tableProps} />
      </Card>
      <Modal {...addModalProps}>
        <AddFormGen />
      </Modal>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...addSubModalProps}>
        <SubAddFormGen />
      </Modal>
      <Modal {...updateSubModalProps}>
        <SubUpdateFormGen />
      </Modal>
      <Modal {...infoSubModalProps}>
        <TransSubCodeTable {...infoSubTableProps} />
      </Modal>
      <Modal {...entryRulesModalProps}>
        <EntryRulesQueryForm {...entryRulesQueryFormProps} />
        <EntryRulesInfPageForm {...entryRulesFormProps} />
      </Modal>
      <Modal {...subRelatedExtModalProps}>
        <SubRelatedExtQueryForm {...subRelatedExtQueryFormProps} />
        <SubRelatedExtPageForm {...subRelatedExtFormProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ transBaseManage }) {
  return { transBaseManage };
}

export default connect(mapStateToProps)(TransBaseManage);
