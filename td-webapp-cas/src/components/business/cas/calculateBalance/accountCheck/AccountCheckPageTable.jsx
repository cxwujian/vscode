import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';

const AccountCheckPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange } = props;
  const bizMap = i18n.bizMap('cas/accountCheck');
  const tableProps = {
    rowKey: record => record.subject + record.actDat + record.ccy,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.accTyp, dataIndex: 'accTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['accTyp-1']; break;
            case '2': txt = bizMap['accTyp-2']; break;
            case '3': txt = bizMap['accTyp-3']; break;
            case '4': txt = bizMap['accTyp-4']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      {
        title: bizMap.subject, dataIndex: 'subject', width: 100, render(text, record) {
          return `${text}-${record.subjectNme}`;
        },
      },
      { title: bizMap.subjectAmtTotal, dataIndex: 'subjectAmtTotal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.accountAmtTotal, dataIndex: 'accountAmtTotal', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      {
        title: bizMap.checkResult, dataIndex: 'checkResult', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['checkResult-00']; break;
            case '01': txt = bizMap['checkResult-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'} > {txt}</span>;
        },
      },
    ],
    scroll: { x: 1400 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

AccountCheckPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
};

AccountCheckPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
}

export default AccountCheckPageTable;
