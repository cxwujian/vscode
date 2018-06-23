import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const TransRelatedExtPageTable = (props) => {
  const { tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleUpdateClick, tableCurrentPage, handleDeleteClick } = props;
  const bizMap = i18n.bizMap('cas/transRelatedExt');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.extCod,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.extCod, dataIndex: 'extCod', width: 250 },
      { title: bizMap.extDesc, dataIndex: 'extDesc', width: 350 },
      {
        title: bizMap.extTyp, dataIndex: 'extTyp', width: 200, render(text) {
          let txt = '';
          switch (text) {
            case '01': txt = bizMap['extTyp-01']; break;
            case '02': txt = bizMap['extTyp-02']; break;
            case '03': txt = bizMap['extTyp-03']; break;
            case '04': txt = bizMap['extTyp-04']; break;
            case '05': txt = bizMap['extTyp-05']; break;
            default: break;
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.extSts, dataIndex: 'extSts', render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['extSts-00']; break;
            case '01': txt = bizMap['extSts-01']; break;
            default: break;
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark', width: 200 },
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
    scroll: { x: 1100 },
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

TransRelatedExtPageTable.propTypes = {
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableCurrentPage: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleUpdateClick: PropTypes.func,
  handleDeleteClick: PropTypes.func,
};

TransRelatedExtPageTable.defaultProps = {
  tableList: [],
  tableTotal: 0,
  tableCurrentPage: 1,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleUpdateClick: noop,
  handleDeleteClick: noop,
}

export default TransRelatedExtPageTable;
