import React, { PropTypes } from 'react';
import PageTable from '../../../common/PageTable';
import * as i18n from '../../../../utils/i18n';

const noop = () => { };

const PubExchangeRatePageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('bas/pubExchangeRate');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.rateId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.fromCurrency, dataIndex: 'fromCurrency', width: 80 },
      { title: bizMap.toCurrency, dataIndex: 'toCurrencys', width: 200 },
      { title: bizMap.dataCollectingTime, dataIndex: 'dataCollectingTime', width: 150 },
      { title: bizMap.dataSource, dataIndex: 'dataSource', width: 150 },
      // { title: bizMap.rate, dataIndex: 'rate', width: 150 },
      { title: bizMap.upRate, dataIndex: 'upRate', width: 150 },
      { title: bizMap.downRate, dataIndex: 'downRate', width: 150 },
      { title: bizMap.riskRateFloat, dataIndex: 'riskRateFloat', width: 200 },
      {
        title: bizMap.status, dataIndex: 'status', render(text) {
          let txt = '';
          switch (text) {
            case '1': txt = bizMap['status-1']; break;
            case '0': txt = bizMap['status-0']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: commonMap.action, fixed: 'right', width: 120, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1200 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };
  return (<PageTable {...tableProps} />);
};

PubExchangeRatePageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

PubExchangeRatePageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default PubExchangeRatePageTable;
