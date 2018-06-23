import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';
import { formatDateString } from '../../../../../utils/date';

const noop = () => { };

const AccManageInfPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect,
    handleUpdateClick, handleDetailClick,
   } = props;
  const bizMap = i18n.bizMap('cas/accManageInf');
  const commonMap = i18n.commonMap();
  const tableProps = {
    rowKey: record => record.pkId,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.subject, dataIndex: 'subject', width: 150, render(text, record) { return `${text}-${record.subjectNme}`; } },
      { title: bizMap.cusNo, dataIndex: 'cusNo', width: 150 },
      { title: bizMap.subAccId, dataIndex: 'subAccId', width: 150, render(text, record) { return `${text}-${record.subAccName}`; } },
      {
        title: bizMap.accMode, dataIndex: 'accMode', width: 100, render(text) {
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
      { title: bizMap.fixedTim, dataIndex: 'fixedTim', width: 150 },
      { title: bizMap.fixedAlterTim, dataIndex: 'fixedAlterTim', width: 150 },
      { title: bizMap.regTim, dataIndex: 'regTim', width: 100, render(text) { return formatDateString(text); } },
      { title: bizMap.remark, dataIndex: 'remark' },
      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleUpdateClick(record); }}>{commonMap.update}</a>
              <span className="ant-divider" />
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },
    ],
    scroll: { x: 1350 },
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

AccManageInfPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
  handleUpdateClick: PropTypes.func,
};

AccManageInfPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
}

export default AccManageInfPageTable;
