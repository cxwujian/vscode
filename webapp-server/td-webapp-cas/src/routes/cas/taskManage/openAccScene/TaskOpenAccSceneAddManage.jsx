import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal } from 'antd';
import TaskTodoPageTable from '../../../../components/business/cas/task/taskPageTable/TaskTodoPageTable';
import TaskMyApplyPageTable from '../../../../components/business/cas/task/taskPageTable/TaskMyApplyPageTable';
import TaskMyFinishPageTable from '../../../../components/business/cas/task/taskPageTable/TaskMyFinishPageTable';
import TaskManageQueryForm from '../../../../components/business/cas/task/TaskManageQueryForm';
import TaskAuditForm from '../../../../components/business/cas/task/openAccScene/TaskAuditForm';
import OpenAccScenePageTable from '../../../../components/business/cas/openAccManage/openAccScene/OpenAccScenePageTable';
import TaskAuditHisTable from '../../../../components/business/cas/task/TaskAuditHisTable';
import * as i18n from '../../../../utils/i18n';

const TabPane = Tabs.TabPane;
const TaskOpenAccSceneAddManage = ({ dispatch, taskOpenAccSceneAddManage }) => {
  const bizMap = i18n.bizMap('cas/task');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    updateModalVisible, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData, formReset,
    auditHisModalVisible, auditHisData,
  } = taskOpenAccSceneAddManage;
  const cardProps = {
    title: bizMap.taskOpenAccSceneAddManage,
    style: { width: '100%' },
  };
  const todoQueryFormProps = {
    data: { modeltype: '1010', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1010';
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryTodoList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myApplyQueryFormProps = {
    data: { modeltype: '1010', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1010';
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyApplyList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myFinishQueryFormProps = {
    data: { modeltype: '1010', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1010';
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyFinishList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const infoModalProps = {
    width: 848,
    footer: null,
    title: commonMap.info,
    visible: infoModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData.queryMap,
  };
  const auditHisModalProps = {
    width: 848,
    footer: null,
    title: bizMap.auditHis,
    visible: auditHisModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/toggleModal',
        payload: { type: 'auditHis', data: { auditHisList: [] } },
      });
    },
  };
  const auditHisTableProps = {
    data: auditHisData,
  };
  const updateModalProps = {
    width: 848,
    footer: null,
    title: bizMap.audit,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmitAgree: (dat) => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateAgree',
        payload: { ...dat },
      });
    },
    formSubmitReject: (dat) => {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateReject',
        payload: { ...dat },
      });
    },
  };
  const todoFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryTodoList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryAuditHis',
        payload: { ...record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/beforeUpdate',
        payload: { ...record },
      });
    },
  };
  const myApplyFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyApplyList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const myFinishFormProps = {
    tableCurrentPage,
    tableList,
    tableLoading,
    tableTotal,
    tablePageChange(next) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyFinishList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const UpdateFormGen = () => <TaskAuditForm {...updateFormProps} />;

  const changeTabPane = (activeKey) => {
    dispatch({
      type: 'taskOpenAccSceneAddManage/updateState',
      payload: { formReset: true },
    });
    if (activeKey === '1') {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryTodoList',
        payload: { tableParam: { modeltype: '1010', currentPage: 1 } },
      });
    } else if (activeKey === '2') {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyFinishList',
        payload: { tableParam: { modeltype: '1010', currentPage: 1 } },
      });
    } else if (activeKey === '3') {
      dispatch({
        type: 'taskOpenAccSceneAddManage/queryMyApplyList',
        payload: { tableParam: { modeltype: '1010', currentPage: 1 } },
      });
    }
  }
  return (
    <div>
      <Card {...cardProps}>
        <Tabs defaultActiveKey="1" onChange={changeTabPane}>
          <TabPane tab={bizMap.taskTodo} key="1">
            <TaskManageQueryForm {...todoQueryFormProps} />
            <TaskTodoPageTable {...todoFormProps} />
          </TabPane>
          <TabPane tab={bizMap.taskMyFinish} key="2">
            <TaskManageQueryForm {...myFinishQueryFormProps} />
            <TaskMyFinishPageTable {...myFinishFormProps} />
          </TabPane>
          <TabPane tab={bizMap.taskMyApply} key="3">
            <TaskManageQueryForm {...myApplyQueryFormProps} />
            <TaskMyApplyPageTable {...myApplyFormProps} />
          </TabPane>
        </Tabs>
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <OpenAccScenePageTable {...infoTableProps} />
      </Modal>
      <Modal {...auditHisModalProps}>
        <TaskAuditHisTable {...auditHisTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ taskOpenAccSceneAddManage }) {
  return { taskOpenAccSceneAddManage };
}

export default connect(mapStateToProps)(TaskOpenAccSceneAddManage);
