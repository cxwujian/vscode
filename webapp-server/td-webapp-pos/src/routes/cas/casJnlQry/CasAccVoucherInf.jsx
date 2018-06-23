import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CasAccVoucherInfQueryForm from '../../../components/business/cas/casJnlQry/casAccVoucherInf/CasAccVoucherInfQueryForm';
import CasAccVoucherInfPageTable from '../../../components/business/cas/casJnlQry/casAccVoucherInf/CasAccVoucherInfPageTable';
import CasAccVoucherInfoTable from '../../../components/business/cas/casJnlQry/casAccVoucherInf/CasAccVoucherInfoTable';
//import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const CasAccVoucherInf = ({ dispatch, casAccVoucherInf }) => {
  const objectid = 'sceneId';
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, infoModalVisible, infoTableData, advExpand,
    subjectModalVisible, subjectData, amtCountInfo,
  } = casAccVoucherInf;
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
    title: bizMap.casAccVoucherInf,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    advExpand,
    subjectModalVisible,
    subjectData,
    formSubmit: (dat) => {
      dispatch({
        type: 'casAccVoucherInf/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'casAccVoucherInf/toggleAdvExpand',
      });
    },
    querySubjectList(tableParam) {
      dispatch({
        type: 'casAccVoucherInf/querySubjectList',
        payload: { tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'casAccVoucherInf/updateState',
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
        type: 'casAccVoucherInf/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'casAccVoucherInf/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'casAccVoucherInf/toggleModal',
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
        type: 'casAccVoucherInf/toggleModal',
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
        <CasAccVoucherInfQueryForm {...queryFormProps} />
        <CasAccVoucherInfPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <CasAccVoucherInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ casAccVoucherInf }) {
  return { casAccVoucherInf };
}

export default connect(mapStateToProps)(CasAccVoucherInf);
