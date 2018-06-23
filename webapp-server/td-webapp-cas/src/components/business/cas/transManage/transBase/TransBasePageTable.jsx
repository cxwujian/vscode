import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const TransBasePageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange,
    tableRowSelect, handleDeleteClick, handleUpdateClick,
    handleSubUpdateClick, handleSubDetailClick, handleMatchEntryClick, handleSubDeleteClick, handleMatchExCodeClick }
    = props;
  const bizMap = i18n.bizMap('cas/transaction');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.txnCode + record.subCod,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.txnCode, dataIndex: 'txnCode', width: 100 },
      { title: bizMap.txnDesc, dataIndex: 'txnDesc', width: 150 },
      { title: bizMap.subCod, dataIndex: 'subCod', width: 100 },
      { title: bizMap.subCodDesc, dataIndex: 'subCodDesc', width: 150 },
      { title: bizMap.entryId, dataIndex: 'entryId', width: 150 },
      { title: bizMap.entryDesc, dataIndex: 'entryDesc', width: 150 },
      { title: bizMap.extCod, dataIndex: 'extCod', width: 150 },
      { title: bizMap.extDesc, dataIndex: 'extDesc', width: 150 },
      {
        title: bizMap.txnSts, dataIndex: 'txnSts', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['txnSts-00']; break;
            case '01': txt = bizMap['txnSts-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            record.subCod ?
              <span>
                <a onClick={() => { handleSubUpdateClick(record); }}>{commonMap.update}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleMatchEntryClick(record); }}>{bizMap.matchEntry}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleMatchExCodeClick(record); }}>{bizMap.matchExCode}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleSubDetailClick(record); }}>{commonMap.detail}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleSubDeleteClick(record); }}>{commonMap.delete}</a>
              </span>
              :
              <span>
                <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
                <span className="ant-divider" />
                <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
              </span>
          );
        },
      },

    ],
    scroll: { x: 900, y: 500 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    tablePageChange(next) {
      tablePageChange(next);
    },
    tableRowSelect(selectedRows) {
      tableRowSelect(selectedRows);
    },
  };

  return (<PageTable {...tableProps} />);
}

TransBasePageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleSubUpdateClick: PropTypes.func,
  handleSubDetailClick: PropTypes.func,
  handleMatchEntryClick: PropTypes.func,
  handleSubDeleteClick: PropTypes.func,
  handleMatchExCodeClick: PropTypes.func,
};

TransBasePageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
  handleDeleteClick: noop,
  handleSubUpdateClick: noop,
  handleSubDetailClick: noop,
  handleMatchEntryClick: noop,
  handleSubDeleteClick: noop,
  handleMatchExCodeClick: noop,
}

export default TransBasePageTable;
