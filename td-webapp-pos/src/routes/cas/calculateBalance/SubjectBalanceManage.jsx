import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import SubjectBalanceQueryForm from '../../../components/business/cas/calculateBalance/subjectBalance/SubjectBalanceQueryForm';
import SubjectBalancePageTable from '../../../components/business/cas/calculateBalance/subjectBalance/SubjectBalancePageTable';
import * as i18n from '../../../utils/i18n';

const SubjectBalanceManage = ({ dispatch, subjectBalanceManage }) => {
  const bizMap = i18n.bizMap('cas/subjectBalance');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
    ccyOptionsData,
  } = subjectBalanceManage;
  const cardProps = {
    title: bizMap.subjectBalanceManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    ccyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'subjectBalanceManage/queryList',
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
  };

  return (
    <div>
      <Card {...cardProps}>
        <SubjectBalanceQueryForm {...queryFormProps} />
        <SubjectBalancePageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ subjectBalanceManage }) {
  return { subjectBalanceManage };
}

export default connect(mapStateToProps)(SubjectBalanceManage);
