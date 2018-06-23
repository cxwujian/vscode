import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { amtMinUnitToStandUnit } from '../../../../../utils/amount';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const CasTxnJnlPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, tableCurrentPage, amtCountInfo } = props;
  const bizMap = i18n.bizMap('cas/casJnlQry');
  const commonMap = i18n.commonMap();
  const renderDataInfo = () => {
    return (
      <div>
        {bizMap.count} &nbsp;&nbsp;
        {
          amtCountInfo.map((amtCount, idx) => {
            return (<div key={idx}>
              {`${bizMap.ccy}: ${amtCount.ccy},`}&nbsp;&nbsp;
              {`${bizMap.txnAmt}: ${amtMinUnitToStandUnit(amtCount.sumTxnAmt)},`}&nbsp;&nbsp;
              {`${bizMap.feeAmt}: ${amtMinUnitToStandUnit(amtCount.sumFeeAmt)}`}
            </div>);
          })
        }
      </div>
    );
  }
  const tableProps = {
    rowKey: record => record.txnLog,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnLog, dataIndex: 'txnLog', width: 150 },
      { title: bizMap.actDat, dataIndex: 'actDat', width: 100, render(text) { return formatDateString(text); } },
      {
        title: bizMap.txnTyp, dataIndex: 'txnTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'N': txt = bizMap['txnTyp-N']; break;
            case 'R': txt = bizMap['txnTyp-R']; break;
            case 'C': txt = bizMap['txnTyp-C']; break;
            case 'H': txt = bizMap['txnTyp-H']; break;
            case 'T': txt = bizMap['txnTyp-T']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.txnAmt, dataIndex: 'txnAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.feeAmt, dataIndex: 'feeAmt', width: 100, render(text, record) { return amtMinUnitToStandUnit(text, record.ccy); } },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
      {
        title: bizMap.accTxnSts, dataIndex: 'accTxnSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'U': txt = bizMap['accTxnSts-U']; break;
            case 'S': txt = bizMap['accTxnSts-S']; break;
            case 'F': txt = bizMap['accTxnSts-F']; break;
            case 'C': txt = bizMap['accTxnSts-C']; break;
            case 'R': txt = bizMap['accTxnSts-R']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.txnCode, dataIndex: 'txnCode', width: 100 },
      { title: bizMap.tckNo, dataIndex: 'tckNo', width: 100 },
      { title: bizMap.voucherId, dataIndex: 'voucherId', width: 100 },
      { title: bizMap.accRspCde, dataIndex: 'accRspCde', width: 100 },
      { title: bizMap.accRspMsg, dataIndex: 'accRspMsg', width: 100 },
      { title: bizMap.regTim, dataIndex: 'regTim', width: 100, render(text) { return formatDateString(text); } },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 150, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1600 },
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

CasTxnJnlPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  amtCountInfo: PropTypes.object,
};

CasTxnJnlPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  amtCountInfo: {},
}

export default CasTxnJnlPageTable;
