import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const MiniSubjectPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, clickCallback } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const tableProps = {
    rowKey: record => record.subject,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.subject, dataIndex: 'subject', width: 80 },
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 120 },
      {
        title: bizMap.cdFlg, dataIndex: 'cdFlg', width: 120, render(text) {
          let txt = '';
          switch (text) {
            case 'D': txt = bizMap['cdFlg-D']; break;
            case 'C': txt = bizMap['cdFlg-C']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      {
        title: bizMap.subTyp, dataIndex: 'subTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'CUS': txt = bizMap['subTyp-CUS']; break;
            case 'PLAT': txt = bizMap['subTyp-PLAT']; break;
            case 'CHN': txt = bizMap['subTyp-CHN']; break;
            case 'BANK': txt = bizMap['subTyp-BANK']; break;
            default: txt = '';
          }
          return txt;
        },
      },
    ],
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    scroll: { y: 240 },
    tablePageChange(next) {
      tablePageChange(next);
    },
    onRowClick(record) {
      clickCallback(record);
    },
  };

  return (<PageTable {...tableProps} />);
}

MiniSubjectPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  clickCallback: PropTypes.func,
};

MiniSubjectPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  clickCallback: noop,
}

export default MiniSubjectPageTable;
