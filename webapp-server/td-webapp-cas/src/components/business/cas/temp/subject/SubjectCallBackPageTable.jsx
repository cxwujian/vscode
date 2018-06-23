import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const SubjectCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback } = props;
  const bizMap = i18n.bizMap('cas/subject');
  const tableProps = {
    rowKey: record => record.subject,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.accTyp, dataIndex: 'accTyp', width: 100 },
      { title: bizMap.subject, dataIndex: 'subject', width: 100 },
      { title: bizMap.subjectNme, dataIndex: 'subjectNme', width: 150 },
      { title: bizMap.subjectLev, dataIndex: 'subjectLev', width: 100 },
      {
        title: bizMap.cdFlg, dataIndex: 'cdFlg', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'D': txt = bizMap['cdFlg-D']; break;
            case 'C': txt = bizMap['cdFlg-C']; break;
            default: txt = '';
          }
          return <span title={txt}>{txt}</span>;
        },
      },
      { title: bizMap.ccy, dataIndex: 'ccy', width: 100 },
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
      {
        title: bizMap.subSts, dataIndex: 'subSts', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['subSts-00']; break;
            case '01': txt = bizMap['subSts-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
      { title: bizMap.remark, dataIndex: 'remark' },
    ],
    scroll: { x: 900 },
    tableList,
    tableTotal,
    tableLoading,
    tableCurrentPage,
    rowSelection: null,
    onRowClick(record) {
      rowClickCallback(record);
    },
    tablePageChange(next) {
      tablePageChange(next);
    },
  };

  return (<PageTable {...tableProps} />);
}

SubjectCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
};

SubjectCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
}

export default SubjectCallBackPageTable;
