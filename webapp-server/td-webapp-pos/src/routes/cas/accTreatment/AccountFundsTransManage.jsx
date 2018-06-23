import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AccountFundsTransForm from '../../../components/business/cas/accTreatment/accountFundsTrans/AccountFundsTransForm';
import * as i18n from '../../../utils/i18n';
import { callConfirm } from '../../../utils/alert';
import { cent2Yuan } from '../../../utils/currency';

const AccountFundsTransManage = ({ dispatch, accountFundsTransManage }) => {
  const bizMap = i18n.bizMap('cas/accFundsTrans');
  const {
    FundsTransSubmit, ccyOptionsData, addFormData,
    chnModalVisible, chnData, cChnModalVisible, cChnData,
    tabsGroupsData,
  } = accountFundsTransManage;
  const cardProps = {
    title: bizMap.accFundsTransManage,
    style: { width: '100%' },
  };
  const fundsTransAme = fundsTransAmt => (
    <p style={{ color: '#5C5C5C', fontSize: 16, fontWeight: '600' }}>{bizMap.fundsTransAmt}: <span style={{ color: '#ff4205', fontSize: 16 }} > {cent2Yuan(fundsTransAmt)}</span></p >
  )
  const fundsTransFormProps = {
    chnData,
    chnModalVisible,
    cChnData,
    cChnModalVisible,
    data: addFormData,
    submiting: FundsTransSubmit,
    ccyOptionsData,
    tabsGroupsData,
    handleTabsChange(key) {
      console.log('key==', key)
      dispatch({
        type: 'accountFundsTransManage/qryFundsTransInfo',
        payload: { extCod: key },
      });
    },
    formSubmit(dat) {
      callConfirm(bizMap.FundsTransConfirm, fundsTransAme(dat.fundsTransAmt), () => {
        dispatch({
          type: 'accountFundsTransManage/accountFundsTrans',
          payload: { ...dat },
        });
      });
    },
    queryChnList(tableParam) {
      dispatch({
        type: 'accountFundsTransManage/queryChnList',
        payload: { tableParam },
      });
    },
    onCancelChnModel() {
      dispatch({
        type: 'accountFundsTransManage/updateState',
        payload: { chnModalVisible: false },
      });
    },
    cQueryChnList(tableParam) {
      dispatch({
        type: 'accountFundsTransManage/cQueryChnList',
        payload: { tableParam },
      });
    },
    cOnCancelChnModel() {
      dispatch({
        type: 'accountFundsTransManage/updateState',
        payload: { cChnModalVisible: false },
      });
    },
    setFormFieldsValue(dat) {
      dispatch({
        type: 'accountFundsTransManage/updateState',
        payload: { addFormData: dat },
      });
    },
  };
  return (
    <Card {...cardProps}>
      < AccountFundsTransForm {...fundsTransFormProps} />
    </Card>
  );
};

function mapStateToProps({ accountFundsTransManage }) {
  return { accountFundsTransManage };
}

export default connect(mapStateToProps)(AccountFundsTransManage);
