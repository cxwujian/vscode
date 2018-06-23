import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AccountRechargeForm from '../../../components/business/cas/accTreatment/accountRecharge/AccountRechargeForm';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import { cent2Yuan } from '../../../utils/currency';

const AccountRechargeManage = ({ dispatch, accountRechargeManage }) => {
  const bizMap = i18n.bizMap('cas/accRecharge');
  const {
    rechargeSubmit, ccyOptionsData, extCodOptionsData, addFormData, cusModalVisible, cusData,
    chnModalVisible, chnData,
  } = accountRechargeManage;
  const cardProps = {
    title: bizMap.accRechargeManage,
    style: { width: '100%' },
  };
  const rechargeAme = rechargeAmt => (
    <p style={{ color: '#5C5C5C', fontSize: 16, fontWeight: '600' }}>{bizMap.rechargeAmt}: <span style={{ color: '#ff4205', fontSize: 16 }} > {cent2Yuan(rechargeAmt)}</span></p >
  )

  const rechargeFormProps = {
    cusData,
    cusModalVisible,
    chnData,
    chnModalVisible,
    data: addFormData,
    submiting: rechargeSubmit,
    ccyOptionsData,
    extCodOptionsData,
    formSubmit(dat) {
      callConfirm(bizMap.rechargeConfirm, rechargeAme(dat.rechargeAmt), () => {
        dispatch({
          type: 'accountRechargeManage/accountRecharge',
          payload: { ...dat },
        });
      });
    },
    queryCusList(formdata, tableParam) {
      dispatch({
        type: 'accountRechargeManage/queryCusList',
        payload: { formdata, tableParam },
      });
    },
    onCancelCusModel() {
      dispatch({
        type: 'accountRechargeManage/updateState',
        payload: { cusModalVisible: false },
      });
    },
    queryChnList(formdata, tableParam) {
      dispatch({
        type: 'accountRechargeManage/queryChnList',
        payload: { formdata, tableParam },
      });
    },
    onCancelChnModel() {
      dispatch({
        type: 'accountRechargeManage/updateState',
        payload: { chnModalVisible: false },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accountRechargeManage/updateState',
        payload: { addFormData: dat },
      });
    },
  };
  return (
    <Card {...cardProps}>
      < AccountRechargeForm {...rechargeFormProps} />
    </Card>
  );
};

function mapStateToProps({ accountRechargeManage }) {
  return { accountRechargeManage };
}

export default connect(mapStateToProps)(AccountRechargeManage);
