import React from 'react';
import { connect } from 'dva';
import { Card, Tabs, Modal } from 'antd';
import TaskTodoPageTable from '../../../../components/business/cas/task/taskPageTable/TaskTodoPageTable';
import TaskMyApplyPageTable from '../../../../components/business/cas/task/taskPageTable/TaskMyApplyPageTable';
import TaskMyFinishPageTable from '../../../../components/business/cas/task/taskPageTable/TaskMyFinishPageTable';
import TaskManageQueryForm from '../../../../components/business/cas/task/TaskManageQueryForm';
import TaskAuditForm from '../../../../components/business/cas/task/subCode/TaskAuditForm';
import SubjectCodeInfoTable from '../../../../components/business/cas/subjectManage/subjectCode/SubjectCodeInfoTable';
import TaskAuditHisTable from '../../../../components/business/cas/task/TaskAuditHisTable';
import * as i18n from '../../../../utils/i18n';

const TabPane = Tabs.TabPane;
const TaskSubCodeEnableManage = ({ dispatch, taskSubCodeEnableManage }) => {
  const bizMap = i18n.bizMap('cas/task');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    updateModalVisible, updateFormSubmit, updateFormData,
    infoModalVisible, infoTableData, formReset,
    auditHisModalVisible, auditHisData,
  } = taskSubCodeEnableManage;
  const cardProps = {
    title: bizMap.taskSubCodeEnableManage,
    style: { width: '100%' },
  };
  const todoQueryFormProps = {
    data: { modeltype: '1202', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1202';
      dispatch({
        type: 'taskSubCodeEnableManage/queryTodoList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myApplyQueryFormProps = {
    data: { modeltype: '1202', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1202';
      dispatch({
        type: 'taskSubCodeEnableManage/queryMyApplyList',
        payload: { tableParam: { ...queryDat, currentPage: 1 } },
      });
    },
  };
  const myFinishQueryFormProps = {
    data: { modeltype: '1202', formReset },
    changeResetData: () => {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { formReset: false },
      });
    },
    formSubmit: (dat) => {
      const queryDat = dat;
      queryDat.modeltype = '1202';
      dispatch({
        type: 'taskSubCodeEnableManage/queryMyFinishList',
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
        type: 'taskSubCodeEnableManage/toggleModal',
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
    title: commonMap.auditHis,
    visible: auditHisModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskSubCodeEnableManage/toggleModal',
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
    title: commonMap.update,
    visible: updateModalVisible,
    onCancel: () => {
      dispatch({
        type: 'taskSubCodeEnableManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    formSubmitAgree: (dat) => {
      dispatch({
        type: 'taskSubCodeEnableManage/updateAgree',
        payload: { ...dat },
      });
    },
    formSubmitReject: (dat) => {
      dispatch({
        type: 'taskSubCodeEnableManage/updateReject',
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
        type: 'taskSubCodeEnableManage/queryTodoList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/queryAuditHis',
        payload: { ...record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/beforeUpdate',
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
        type: 'taskSubCodeEnableManage/queryMyApplyList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/queryAuditHis',
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
        type: 'taskSubCodeEnableManage/queryMyFinishList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'taskSubCodeEnableManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/queryOne',
        payload: { ...record },
      });
    },
    handleAuditHisClick(record) {
      dispatch({
        type: 'taskSubCodeEnableManage/queryAuditHis',
        payload: { ...record },
      });
    },
  };
  const UpdateFormGen = () => <TaskAuditForm {...updateFormProps} />;

  const changeTabPane = (activeKey) => {
    dispatch({
      type: 'taskSubCodeEnableManage/updateState',
      payload: { formReset: true },
    });
    if (activeKey === '1') {
      dispatch({
        type: 'taskSubCodeEnableManage/queryTodoList',
        payload: { tableParam: { modeltype: '1202', currentPage: 1 } },
      });
    } else if (activeKey === '2') {
      dispatch({
        type: 'taskSubCodeEnableManage/queryMyFinishList',
        payload: { tableParam: { modeltype: '1202', currentPage: 1 } },
      });
    } else if (activeKey === '3') {
      dispatch({
        type: 'taskSubCodeEnableManage/queryMyApplyList',
        payload: { tableParam: { modeltype: '1202', currentPage: 1 } },
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
        <SubjectCodeInfoTable {...infoTableProps} />
      </Modal>
      <Modal {...auditHisModalProps}>
        <TaskAuditHisTable {...auditHisTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ taskSubCodeEnableManage }) {
  return { taskSubCodeEnableManage };
}

export default connect(mapStateToProps)(TaskSubCodeEnableManage);
