import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import AccDayEndBalQueryForm from '../../../components/business/cas/calculateBalance/accDayEndBal/AccDayEndBalQueryForm';
import AccDayEndBalPageTable from '../../../components/business/cas/calculateBalance/accDayEndBal/AccDayEndBalPageTable';
import * as i18n from '../../../utils/i18n';

const AccDayEndBalManage = ({ dispatch, accDayEndBalManage }) => {
  const bizMap = i18n.bizMap('cas/accDayEndBal');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage, amtCountInfo,
    ccyOptionsData,
  } = accDayEndBalManage;
  const cardProps = {
    title: bizMap.accDayEndBalManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    ccyOptionsData,
    formSubmit: (dat) => {
      dispatch({
        type: 'accDayEndBalManage/queryList',
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
        type: 'accDayEndBalManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };

  return (
    <div>
      <Card {...cardProps}>
        <AccDayEndBalQueryForm {...queryFormProps} />
        <AccDayEndBalPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ accDayEndBalManage }) {
  return { accDayEndBalManage };
}

export default connect(mapStateToProps)(AccDayEndBalManage);
