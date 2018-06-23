import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AccountCheckQueryForm from '../../../components/business/cas/calculateBalance/accountCheck/AccountCheckQueryForm';
import AccountCheckPageTable from '../../../components/business/cas/calculateBalance/accountCheck/AccountCheckPageTable';
import * as i18n from '../../../utils/i18n';

const AccountCheckManage = ({ dispatch, accountCheckManage }) => {
  const bizMap = i18n.bizMap('cas/accountCheck');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    ccyOptionsData,
  } = accountCheckManage;
  const cardProps = {
    title: bizMap.accountCheckManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    ccyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'accountCheckManage/queryList',
        payload: { tableParam: { ...dat, currentPage: 1 } },
      });
    },
  };
  const tableProps = {
    tableList,
    tableLoading,
    tableTotal,
    tableCurrentPage,
    tableParam,
    tablePageChange(next) {
      dispatch({
        type: 'accountCheckManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <AccountCheckQueryForm {...queryFormProps} />
        <AccountCheckPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ accountCheckManage }) {
  return { accountCheckManage };
}

export default connect(mapStateToProps)(AccountCheckManage);
