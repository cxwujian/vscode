import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const AmtCdeInfPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage, handleDeleteClick } = props;
  const bizMap = i18n.bizMap('cas/amtCdeInf');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.amtCde,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.amtCde, dataIndex: 'amtCde', width: 200 },
      { title: bizMap.amtCdeDes, dataIndex: 'amtCdeDes', width: 200 },
      {
        title: bizMap.isSystem, dataIndex: 'isSystem', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '0': txt = bizMap['isSystem-0']; break;
            case '1': txt = bizMap['isSystem-1']; break;
            default: break;
          }
          return <span>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 150, render(text, record) {
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
    scroll: { x: 950 },
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

AmtCdeInfPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

AmtCdeInfPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
  handleDeleteClick: noop,
}

export default AmtCdeInfPageTable;
