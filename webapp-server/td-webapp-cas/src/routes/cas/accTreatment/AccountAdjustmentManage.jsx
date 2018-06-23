import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AccountAdjustmentForm from '../../../components/business/cas/accTreatment/accountAdjustment/AccountAdjustmentForm';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import { amtMinUnitToStandUnit } from '../../../utils/amount';

const AccountAdjustmentManage = ({ dispatch, accountAdjustmentManage }) => {
  const bizMap = i18n.bizMap('cas/accAdjustment');
  const {
    adjustmentSubmit, ccyOptionsData, addFormData, cusModalVisible, cusData, subjectModalVisible, subjectData,
    cCusModalVisible, cCusData, cSubjectModalVisible, cSubjectData,
    chnModalVisible, chnData, cChnModalVisible, cChnData,
  } = accountAdjustmentManage;
  const cardProps = {
    title: bizMap.accAdjustmentManage,
    style: { width: '100%' },
  };
  const adjustmentAme = (adjustmentAmt, ccy) => (
    <p style={{ color: '#5C5C5C', fontSize: 16, fontWeight: '600' }}>{bizMap.adjustmentAmt}: <span style={{ color: '#ff4205', fontSize: 16 }} > {amtMinUnitToStandUnit(adjustmentAmt, ccy)}</span></p >
  )
  const adjustmentFormProps = {
    subjectData,
    subjectModalVisible,
    cusData,
    cusModalVisible,
    cSubjectData,
    cSubjectModalVisible,
    cCusData,
    cCusModalVisible,
    chnData,
    chnModalVisible,
    cChnData,
    cChnModalVisible,
    data: addFormData,
    submiting: adjustmentSubmit,
    ccyOptionsData,
    formSubmit(dat) {
      callConfirm(bizMap.adjustmentConfirm, adjustmentAme(dat.adjustmentAmt, dat.ccy), () => {
        dispatch({
          type: 'accountAdjustmentManage/accountAdjustment',
          payload: { ...dat },
        });
      });
    },
    querySubjectList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/querySubjectList',
        payload: { formdata, tableParam },
      });
    },
    onCancelSubjectModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { subjectModalVisible: false },
      });
    },
    queryCusList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/queryCusList',
        payload: { formdata, tableParam },
      });
    },
    onCancelCusModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cusModalVisible: false },
      });
    },
    cQuerySubjectList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/cQuerySubjectList',
        payload: { formdata, tableParam },
      });
    },
    cOnCancelSubjectModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cSubjectModalVisible: false },
      });
    },
    cQueryCusList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/cQueryCusList',
        payload: { formdata, tableParam },
      });
    },
    cOnCancelCusModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cCusModalVisible: false },
      });
    },
    queryChnList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/queryChnList',
        payload: { formdata, tableParam },
      });
    },
    onCancelChnModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { chnModalVisible: false },
      });
    },
    cQueryChnList(formdata, tableParam) {
      dispatch({
        type: 'accountAdjustmentManage/cQueryChnList',
        payload: { formdata, tableParam },
      });
    },
    cOnCancelChnModel() {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cChnModalVisible: false },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { addFormData: dat },
      });
    },
    expandedRowsChange(expandedRows) {
      const tempCusData = cusData;
      tempCusData.expandedRowKeys = expandedRows;
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cusData: tempCusData },
      });
    },
    cExpandedRowsChange(expandedRows) {
      const tempCusData = cCusData;
      tempCusData.expandedRowKeys = expandedRows;
      dispatch({
        type: 'accountAdjustmentManage/updateState',
        payload: { cCusData: tempCusData },
      });
    },
  };
  return (
    <Card {...cardProps}>
      < AccountAdjustmentForm {...adjustmentFormProps} />
    </Card>
  );
};

function mapStateToProps({ accountAdjustmentManage }) {
  return { accountAdjustmentManage };
}

export default connect(mapStateToProps)(AccountAdjustmentManage);
