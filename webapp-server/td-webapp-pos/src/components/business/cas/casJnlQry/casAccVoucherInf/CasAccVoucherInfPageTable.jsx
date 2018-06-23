import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { cent2Yuan } from '../../../../../utils/currency';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const CasAccVoucherInfPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, tableCurrentPage, amtCountInfo } = props;
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const renderDataInfo = () => {
    return (
      <div>
        {bizMap.count}&nbsp;&nbsp;
        {`${bizMap.debitAmt}: ${cent2Yuan(amtCountInfo.sumDebitAmt)},`}&nbsp;&nbsp;
        {`${bizMap.creditAmt}: ${cent2Yuan(amtCountInfo.sumCreditAmt)}`}
      </div>
    );
  }
  const tableProps = {
    rowKey: record => record.txnLog + record.voucherId + record.subject,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnLog, dataIndex: 'txnLog', width: 150 },
      { title: bizMap.voucherId, dataIndex: 'voucherId', width: 150 },
      { title: bizMap.subject, dataIndex: 'subject', width: 150 },
      { title: bizMap.debitAmt, dataIndex: 'debitAmt', width: 150, render(text) { return cent2Yuan(text); } },
      { title: bizMap.creditAmt, dataIndex: 'creditAmt', width: 150, render(text) { return cent2Yuan(text); } },
      {
        title: bizMap.cdFlg, dataIndex: 'cdFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'D': txt = bizMap['cdFlg-D']; break;
            case 'C': txt = bizMap['cdFlg-C']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.submitOpr, dataIndex: 'submitOpr', width: 150 },
      { title: bizMap.regTim, dataIndex: 'regTim', width: 150, render(text) { return formatDateString(text); } },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1400 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    footer: renderDataInfo,
    rowSelection: null,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

CasAccVoucherInfPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  amtCountInfo: PropTypes.object,
};

CasAccVoucherInfPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  amtCountInfo: {},
}

export default CasAccVoucherInfPageTable;
