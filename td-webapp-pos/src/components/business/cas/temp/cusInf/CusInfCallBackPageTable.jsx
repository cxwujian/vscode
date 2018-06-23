import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const CusInfCallBackPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, rowClickCallback } = props;
  const bizMap = i18n.bizMap('cas/cusInf');
  const tableProps = {
    rowKey: record => record.cusNo,
    // 若最后一列固定在最右 则倒数第二列不设宽度 其他列设置宽度 且scroll属性中x的值设置为大于所有列宽之和(估算倒数第二列宽度) ？
    tableColumns: [
      { title: bizMap.cusNo, dataIndex: 'cusNo', width: 150 },
      {
        title: bizMap.cusTyp, dataIndex: 'cusTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case 'usr': txt = bizMap['usr-typ']; break;
            case 'mer': txt = bizMap['mer-typ']; break;
            case 'agt': txt = bizMap['agt-typ']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.cusNme, dataIndex: 'cusNme', width: 150 },
      {
        title: bizMap.cusCredTyp, dataIndex: 'cusCredTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0102': txt = bizMap['credTyp-1']; break;
            case '0200': txt = bizMap['credTyp-2']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.cusCredNo, dataIndex: 'cusCredNo', width: 200 },
      { title: bizMap.cmuTel, dataIndex: 'cmuTel' },
      {
        title: bizMap.cusSts, dataIndex: 'cusSts', width: 150, render(text) {
          let txt = '';
          switch (text) {
            case '00': txt = bizMap['cusTyp-00']; break;
            case '01': txt = bizMap['cusTyp-01']; break;
            default: txt = '';
          }
          return <span title={txt} className={text === '00' ? 'enable' : 'disable'}>{txt}</span>;
        },
      },
    ],
    scroll: { x: 1300 },
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

CusInfCallBackPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  rowClickCallback: PropTypes.func,
};

CusInfCallBackPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  rowClickCallback: noop,
}

export default CusInfCallBackPageTable;
