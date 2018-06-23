import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CasBokAccJnlQueryForm from '../../../components/business/cas/casJnlQry/casBokAccJnl/CasBokAccJnlQueryForm';
import CasBokAccJnlPageTable from '../../../components/business/cas/casJnlQry/casBokAccJnl/CasBokAccJnlPageTable';
import CasBokAccJnlInfoTable from '../../../components/business/cas/casJnlQry/casBokAccJnl/CasBokAccJnlInfoTable';
//import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const CasBokAccJnl = ({ dispatch, casBokAccJnl }) => {
  const objectid = 'sceneId';
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, tableSelects, infoModalVisible, infoTableData, advExpand, amtCountInfo, transBaseOptionsData,
    subjectData, subjectModalVisible,
  } = casBokAccJnl;
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
    title: bizMap.casBokAccJnl,
    style: { width: '100%' },
  };
  const queryFormProps = {
    subjectData,
    subjectModalVisible,
    transBaseOptionsData,
    tableParam,
    advExpand,
    formSubmit: (dat) => {
      dispatch({
        type: 'casBokAccJnl/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    collapseClick: () => {
      dispatch({
        type: 'casBokAccJnl/toggleAdvExpand',
      });
    },
    querySubjectList(tableParam) {
      const formdata = {};
      dispatch({
        type: 'casBokAccJnl/querySubjectList',
        payload: { formdata, tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'casBokAccJnl/updateState',
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
        type: 'casBokAccJnl/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'casBokAccJnl/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'casBokAccJnl/toggleModal',
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
        type: 'casBokAccJnl/toggleModal',
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
        <CasBokAccJnlQueryForm {...queryFormProps} />
        <CasBokAccJnlPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <CasBokAccJnlInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ casBokAccJnl }) {
  return { casBokAccJnl };
}

export default connect(mapStateToProps)(CasBokAccJnl);
