import React, { PropTypes } from 'react';
import { Form } from 'antd';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const AccFrozHandleInfPageTableForm = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
   } = props;
  const bizMap = i18n.bizMap('cas/accFrozDetail');
  const tableProps = {
    rowKey: record => record.pkId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.actNo, dataIndex: 'actNo', width: 100 },
      {
        title: bizMap.frozTyp, dataIndex: 'frozTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['frozTyp-0']; break;
            case '1': txt = bizMap['frozTyp-1']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.handleFrozAmt, dataIndex: 'frozAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      { title: bizMap.handlefrozRsn, dataIndex: 'frozRsn', width: 100 },
      { title: bizMap.handleCreTim, dataIndex: 'creTim', width: 100, render(text, record) { return formatDateString(record.creTim); } },
      { title: bizMap.creOpr, dataIndex: 'creOpr', width: 100 },
      { title: bizMap.remark, dataIndex: 'remark' },
    ],
    scroll: { x: 900 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (
    <Form layout="horizontal">
      <PageTable {...tableProps} />
    </Form>
  );
}

AccFrozHandleInfPageTableForm.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

AccFrozHandleInfPageTableForm.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
}

export default AccFrozHandleInfPageTableForm;
