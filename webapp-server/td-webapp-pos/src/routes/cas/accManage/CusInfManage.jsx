import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import CusInfQueryForm from '../../../components/business/cas/accManage/cusInf/CusInfQueryForm';
import CusInfPageTable from '../../../components/business/cas/accManage/cusInf/CusInfPageTable';
import CusInfoTable from '../../../components/business/cas/accManage/cusInf/CusInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const CusInfManage = ({ dispatch, cusInfManage }) => {
  const objectid = 'cusNo';
  const bizMap = i18n.bizMap('cas/cusInf');
  const commonMap = i18n.commonMap();

  const {
    advExpand, tableParam, tableLoading, tableList, tableTotal, tableSelects, tableRecord,
    tableCurrentPage,
    infoModalVisible, infoTableData,
    attachInfoModalVisible,
  } = cusInfManage;

  const selectIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const selectId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectid] : tableSelects[i];
    selectIds.push(selectId);
  }

  const cardProps = {
    title: bizMap.cusManage,
    style: { width: '100%' },
  };

  const queryFormProps = {
    advExpand,
    collapseClick: () => {
      dispatch({
        type: 'cusInfManage/toggleAdvExpand',
      });
    },

    formSubmit: (dat) => {
      dispatch({
        type: 'cusInfManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },

    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const cusSts = tableSelects[0].cusSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (cusSts !== tableSelects[i].cusSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].cusSts !== '01' && tableSelects[i].cusSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (cusSts === '00') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'cusInfManage/updateStatus',
            payload: { ids: selectIds.toString(), cusSts: '00' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const cusSts = tableSelects[0].cusSts;
        for (let i = 0; i < tableSelects.length; i++) {
          if (cusSts !== tableSelects[i].cusSts) {
            callNotice(commonMap.warning, commonMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].cusSts !== '01' && tableSelects[i].cusSts !== '00') {
            callNotice(commonMap.warning, commonMap.programErr, 'warning');
            return;
          }
        }
        if (cusSts === '01') {
          callNotice(commonMap.warning, commonMap.enableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'cusInfManage/updateStatus',
            payload: { ids: selectIds.toString(), cusSts: '01' },
          });
        });
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
        type: 'cusInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'cusInfManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'cusInfManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(visible, record) {
      if (visible) {
        dispatch({
          type: 'cusInfManage/updateState',
          payload: { tableRecord: record },
        });
      } else {
        dispatch({
          type: 'cusInfManage/updateState',
          payload: { tableRecord: {} },
        });
      }
    },
    handleUpdateBaseClick() {
      dispatch({
        type: 'cusInfManage/toggleModal',
        payload: { type: 'updateBase', data: tableRecord },
      });
    },
    handleUpdateBankClick() {
      dispatch({
        type: 'cusInfManage/toggleModal',
        payload: { type: 'updateBank', data: tableRecord },
      });
    },
    handleQueryAttachClick(record) {
      dispatch({
        type: 'cusInfManage/queryAttach',
        payload: { PKID: record.merId, TABLENAME: 'mer_info', attachInfoModalVisible: !attachInfoModalVisible },
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
        type: 'cusInfManage/toggleModal',
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
        <CusInfQueryForm {...queryFormProps} />
        <CusInfPageTable {...tableProps} />
      </Card>
      <Modal {...infoModalProps}>
        <CusInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ cusInfManage }) {
  return { cusInfManage };
}

export default connect(mapStateToProps)(CusInfManage);
