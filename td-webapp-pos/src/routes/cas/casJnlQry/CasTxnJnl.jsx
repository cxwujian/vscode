import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CasTxnJnlQueryForm from '../../../components/business/cas/casJnlQry/casTxnJnl/CasTxnJnlQueryForm';
import CasTxnJnlPageTable from '../../../components/business/cas/casJnlQry/casTxnJnl/CasTxnJnlPageTable';
import CasTxnJnlInfoTable from '../../../components/business/cas/casJnlQry/casTxnJnl/CasTxnJnlInfoTable';
//import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const CasTxnJnl = ({ dispatch, casTxnJnl }) => {
  const objectid = 'sceneId';
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, infoModalVisible, infoTableData, advExpand, amtCountInfo, transBaseOptionsData,
  } = casTxnJnl;
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
    title: bizMap.casTxnJnl,
    style: { width: '100%' },
  };
  const queryFormProps = {
    transBaseOptionsData,
    tableParam,
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'casTxnJnl/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'casTxnJnl/toggleAdvExpand',
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
        type: 'casTxnJnl/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'casTxnJnl/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'casTxnJnl/toggleModal',
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
        type: 'casTxnJnl/toggleModal',
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
        <CasTxnJnlQueryForm {...queryFormProps} />
        <CasTxnJnlPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <CasTxnJnlInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ casTxnJnl }) {
  return { casTxnJnl };
}

export default connect(mapStateToProps)(CasTxnJnl);
