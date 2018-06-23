import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const AccModeInfPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, handleDeleteClick } = props;
  const bizMap = i18n.bizMap('cas/accModeInf');
  const commonMap = i18n.commonMap();
  const gettime = (time) => {
    let a = '';
    if (time) {
      a = `${time.substring(0, 2)}:${time.substring(2, 4)}:${time.substring(4, 6)}`;
    } else { a = ''; }
    return a;
  };
  const tableProps = {
    rowKey: record => record.modeId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      {
        title: bizMap.accMode, dataIndex: 'accMode', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['accMode-01']; break;
            case '02': txt = bizMap['accMode-02']; break;
            case '03': txt = bizMap['accMode-03']; break;
            default: txt = '';
          }
          return txt;
        },
      },
      { title: bizMap.modeNme, dataIndex: 'modeNme', width: 200 },
      {
        title: bizMap.fixedTim, dataIndex: 'fixedTim', width: 200, render(text) {
          let txt = '';
          if (text) {
            txt = gettime(text);
          }
          return txt;
        },
      },
      {
        title: bizMap.fixedAlterTim, dataIndex: 'fixedAlterTim', width: 200, render(text) {
          let txt = '';
          if (text) {
            txt = text.replace(/\|/g, ':');
          }
          return txt;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleDeleteClick(record); }}>{commonMap.delete}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 100 },
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

AccModeInfPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDeleteClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

AccModeInfPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDeleteClick: noop,
  handleUpdateClick: noop,
}

export default AccModeInfPageTable;
