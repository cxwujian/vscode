import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import SubjectDayEndBalQueryForm from '../../../components/business/cas/calculateBalance/subjectDayEndBal/SubjectDayEndBalQueryForm';
import SubjectDayEndBalPageTable from '../../../components/business/cas/calculateBalance/subjectDayEndBal/SubjectDayEndBalPageTable';
import * as i18n from '../../../utils/i18n';

const SubjectDayEndBalManage = ({ dispatch, subjectDayEndBalManage }) => {
  const bizMap = i18n.bizMap('cas/subjectDayEndBal');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, amtCountInfo,
    ccyOptionsData,
  } = subjectDayEndBalManage;
  const cardProps = {
    title: bizMap.subjectDayEndBalManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    ccyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'subjectDayEndBalManage/queryList',
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
    amtCountInfo,
    tablePageChange(next) {
      dispatch({
        type: 'subjectDayEndBalManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <SubjectDayEndBalQueryForm {...queryFormProps} />
        <SubjectDayEndBalPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ subjectDayEndBalManage }) {
  return { subjectDayEndBalManage };
}

export default connect(mapStateToProps)(SubjectDayEndBalManage);
