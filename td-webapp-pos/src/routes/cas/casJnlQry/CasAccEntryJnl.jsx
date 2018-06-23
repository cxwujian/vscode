import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CasAccEntryJnlQueryForm from '../../../components/business/cas/casJnlQry/casAccEntryJnl/CasAccEntryJnlQueryForm';
import CasAccEntryJnlPageTable from '../../../components/business/cas/casJnlQry/casAccEntryJnl/CasAccEntryJnlPageTable';
import CasAccEntryJnlInfoTable from '../../../components/business/cas/casJnlQry/casAccEntryJnl/CasAccEntryJnlInfoTable';
import { cent2Yuan } from '../../../utils/currency';
//import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const CasBokAccJnl = ({ dispatch, casAccEntryJnl }) => {
  const objectid = 'sceneId';
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, infoModalVisible, infoTableData, advExpand,
    subjectModalVisible, subjectData, amtCountInfo,
  } = casAccEntryJnl;
  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }
  // const selectIds = [];
  // for (let i = 0; i < tableSelects.length; i++) {
  //   selectIds.push(tableSelects[i].menuId);
  // }
  const cardProps = {
    title: bizMap.casAccEntryJnl,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    advExpand,
    subjectModalVisible,
    subjectData,
    formSubmit: (dat) => {
      dispatch({
        type: 'casAccEntryJnl/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'casAccEntryJnl/toggleAdvExpand',
      });
    },
    querySubjectList(tableParam) {
      dispatch({
        type: 'casAccEntryJnl/querySubjectList',
        payload: { tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'casAccEntryJnl/updateState',
        payload: { subjectModalVisible: false },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    amtCountInfo,
    tablePageChange(next) {
      dispatch({
        type: 'casAccEntryJnl/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'casAccEntryJnl/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'casAccEntryJnl/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 615,
    onCancel: () => {
      dispatch({
        type: 'casAccEntryJnl/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };
  // // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  return (
    <div>
      <Card {...cardProps}>
        <CasAccEntryJnlQueryForm {...queryFormProps} />
        <CasAccEntryJnlPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <CasAccEntryJnlInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ casAccEntryJnl }) {
  return { casAccEntryJnl };
}

export default connect(mapStateToProps)(CasBokAccJnl);
