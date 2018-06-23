import React from 'react';
import { connect } from 'dva';
import { Card, Modal } from 'antd';
import MerchantScancodeQueryForm from '../../../components/business/pms/temp/merchant/MerchantQueryForm';
import MerchantScancodePageTable from '../../../components/business/pms/merchantScancode/MerchantScancodePageTable';
import MerchantScancodeInfoForm from '../../../components/business/pms/merchantScancode/MerchantScancodeInfoForm';
import MerchantScancodeInfoTable from '../../../components/business/pms/merchantScancode/MerchantScancodeInfoTable';
import { callNotice, callConfirm } from '../../../utils/alert';
import * as i18n from '../../../utils/i18n';

const MerchantScancodeManage = ({ dispatch, merchantScancodeManage }) => {
  const objectId1 = 'chnMerId';
  const objectId2 = 'chnId';
  const bizMap = i18n.bizMap('pms/merchantScancode');
  const commonMap = i18n.commonMap();
  const {
    tableParam,
    tableLoading,
    tableList,
    tableTotal,
    tableSelects,
    tableCurrentPage,

    advExpand,

    updateModalVisible,
    updateFormSubmit,
    updateFormData,

    infoModalVisible,
    infoTableData,

  } = merchantScancodeManage;
  const chnMerIds = [];
  const chnIds = [];
  for (let i = 0; i < tableSelects.length; i++) {
    const chnMerId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId1] : tableSelects[i];
    const chnId = typeof tableSelects[i] === 'object' ? tableSelects[i][objectId2] : tableSelects[i];
    chnMerIds.push(chnMerId);
    chnIds.push(chnId);
  }

  const cardProps = {
    title: bizMap.merchantScancode,
    style: { width: '100%' },
  };
  const queryFormProps = {
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantScancodeManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
    addClick: () => {
      dispatch({
        type: 'merchantScancodeManage/toggleModal',
        payload: { type: 'add' },
      });
    },
    enableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnMerStatus = tableSelects[0].chnMerStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnMerStatus !== tableSelects[i].chnMerStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnMerStatus === '1') {
          callNotice(commonMap.warning, commonMap.enaleNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.enableConfirm, () => {
          dispatch({
            type: 'merchantScancodeManage/updateStatus',
            payload: { chnMerIds: chnMerIds.toString(), chnIds: chnIds.toString(), chnMerStatus: '1' },
          });
        });
      }
    },
    disableClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        const chnMerStatus = tableSelects[0].chnMerStatus;
        for (let i = 0; i < tableSelects.length; i++) {
          if (chnMerStatus !== tableSelects[i].chnMerStatus) {
            callNotice(commonMap.warning, bizMap.statusNotMatch, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        if (chnMerStatus === '0') {
          callNotice(commonMap.warning, commonMap.disableNotice, 'warning');
          return;
        }
        callConfirm(commonMap.tip, commonMap.disableConfirm, () => {
          dispatch({
            type: 'merchantScancodeManage/updateStatus',
            payload: { chnMerIds: chnMerIds.toString(), chnIds: chnIds.toString(), chnMerStatus: '0' },
          });
        });
      }
    },
    deleteClick: () => {
      if (tableSelects.length === 0) {
        callNotice(commonMap.warning, commonMap.noSelect, 'warning');
      } else {
        // 判断所选渠道商户是否被禁用
        for (let i = 0; i < tableSelects.length; i++) {
          if (tableSelects[i].chnMerStatus === '1') {
            callNotice(commonMap.warning, bizMap.exitEnable, 'warning');
            return;
          }
          if (tableSelects[i].chnMerStatus !== '0' && tableSelects[i].chnMerStatus !== '1') {
            callNotice(commonMap.warning, bizMap.programErr, 'warning');
            return;
          }
        }
        callConfirm(commonMap.tip, commonMap.deleteConfirm, () => {
          dispatch({
            type: 'merchantScancodeManage/deleteList',
            payload: { chnMerIds: chnMerIds.toString(), chnIds: chnIds.toString() },
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
    width: 900,
    tablePageChange(next) {
      dispatch({
        type: 'merchantScancodeManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
    tableRowSelect(selectedRows) {
      dispatch({
        type: 'merchantScancodeManage/updateState',
        payload: { tableSelects: selectedRows },
      });
    },
    handleDetailClick(record) {
      dispatch({
        type: 'merchantScancodeManage/toggleModal',
        payload: { type: 'info', data: record },
      });
    },
    handleUpdateClick(record) {
      dispatch({
        type: 'merchantScancodeManage/toggleModal',
        payload: { type: 'update', data: record },
      });
    },
  };
  const infoModalProps = {
    footer: null,
    title: commonMap.detail,
    visible: infoModalVisible,
    width: 900,
    onCancel: () => {
      dispatch({
        type: 'merchantScancodeManage/toggleModal',
        payload: { type: 'info', data: {} },
      });
    },
  };
  const infoTableProps = {
    data: infoTableData,
  };

  const updateModalProps = {
    footer: null,
    title: commonMap.update,
    visible: updateModalVisible,
    width: 900,
    onCancel: () => {
      dispatch({
        type: 'merchantScancodeManage/toggleModal',
        payload: { type: 'update', data: {} },
      });
    },
  };
  const channel = [];
  channel.push(updateFormData.txnChannel);
  const updateFormProps = {
    data: updateFormData,
    submiting: updateFormSubmit,
    optType: '2',
    advExpand: advExpand,
    txnChannelSupportList: updateFormData && updateFormData.txnChannel ? channel : [],
    formSubmit: (dat) => {
      dispatch({
        type: 'merchantScancodeManage/updateOne',
        payload: { ...dat },
      });
    },
    advLinkClick: () => {
      dispatch({
        type: 'merchantScancodeManage/updateState',
        payload: { advExpand: !advExpand },
      });
    },
  };
  // 对于更新表单 每次创建新的 不做diff 解决 Form.create initialValue 的问题
  const UpdateFormGen = () => <MerchantScancodeInfoForm {...updateFormProps} />;
  return (
    <div>
      <Card {...cardProps}>
        <MerchantScancodeQueryForm {...queryFormProps} />
        <MerchantScancodePageTable {...tableProps} />
      </Card>
      <Modal {...updateModalProps}>
        <UpdateFormGen />
      </Modal>
      <Modal {...infoModalProps}>
        <MerchantScancodeInfoTable {...infoTableProps} />
      </Modal>
    </div>
  );
};

function mapStateToProps({ merchantScancodeManage }) {
  return { merchantScancodeManage };
}

export default connect(mapStateToProps)(MerchantScancodeManage);
