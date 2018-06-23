import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const CcyFlgInfPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage } = props;
  const bizMap = i18n.bizMap('cas/ccyFlgInf');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.ccy,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.ccyId, dataIndex: 'ccyId', width: 200 },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 200 },
      { title: bizMap.ccyExplain, dataIndex: 'ccyExplain', width: 200 },
      {
        title: bizMap.isCurrency, dataIndex: 'isCurrency', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case 'Y': txt = bizMap['isCurrency-Y']; break;
            case 'N': txt = bizMap['isCurrency-N']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 150, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1150 },
    tableList,
    tableTotal,
    tableCurrentPage,
    tableLoading,
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

CcyFlgInfPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

CcyFlgInfPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
}

export default CcyFlgInfPageTable;
