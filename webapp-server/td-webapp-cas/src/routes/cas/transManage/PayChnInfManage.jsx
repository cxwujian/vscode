import React from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import PayChnInfQueryForm from '../../../components/business/cas/transManage/payChnInf/PayChnInfQueryForm';
import PayChnInfPageTable from '../../../components/business/cas/transManage/payChnInf/PayChnInfPageTable';
import * as i18n from '../../../utils/i18n';

const PayChnInfManage = ({ dispatch, payChnInfManage }) => {
  const bizMap = i18n.bizMap('cas/payChnInf');
  const {
    tableParam, tableLoading, tableList, tableTotal, tableCurrentPage,
  } = payChnInfManage;
  const cardProps = {
    title: bizMap.payChnInfManage,
    style: { width: '100%' },
  };
  const queryFormProps = {
    tableParam,
    formSubmit: (dat) => {
      dispatch({
        type: 'payChnInfManage/queryList',
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
        type: 'payChnInfManage/queryList',
        payload: { tableParam: { ...tableParam, currentPage: next } },
      });
    },
  };
  return (
    <div>
      <Card {...cardProps}>
        <PayChnInfQueryForm {...queryFormProps} />
        <PayChnInfPageTable {...tableProps} />
      </Card>
    </div>
  );
};

function mapStateToProps({ payChnInfManage }) {
  return { payChnInfManage };
}

export default connect(mapStateToProps)(PayChnInfManage);
