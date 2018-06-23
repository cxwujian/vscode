import React, { PropTypes } from 'react';
import PageTable from '../../../../common/PageTable';
import * as i18n from '../../../../../utils/i18n';

const noop = () => { };

const CusInfPageTable = (props) => {
  const { tableCurrentPage, tableList, tableTotal, tableLoading, tablePageChange, tableRowSelect, handleDetailClick } = props;
  const bizMap = i18n.bizMap('cas/cusInf');
  const commonMap = i18n.commonMap();

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

      {
        title: bizMap.cusCredTyp, dataIndex: 'cusCredTyp', width: 100, render(text) {
          let txt = '';
          switch (text) {
            case '0101': txt = bizMap['cusCredTyp-0101']; break;
            case '0102': txt = bizMap['cusCredTyp-0102']; break;
            case '0200': txt = bizMap['cusCredTyp-0200']; break;
            case '0300': txt = bizMap['cusCredTyp-0300']; break;
            case '0601': txt = bizMap['cusCredTyp-0601']; break;
            case '0604': txt = bizMap['cusCredTyp-0604']; break;
            case '0700': txt = bizMap['cusCredTyp-0700']; break;
            case '0800': txt = bizMap['cusCredTyp-0800']; break;
            case '1100': txt = bizMap['cusCredTyp-1100']; break;
            case '1200': txt = bizMap['cusCredTyp-1200']; break;
            case '2100': txt = bizMap['cusCredTyp-2100']; break;
            case '0900': txt = bizMap['cusCredTyp-0900']; break;
            case '2010': txt = bizMap['cusCredTyp-2010']; break;
            case '2020': txt = bizMap['cusCredTyp-2020']; break;
            case '2021': txt = bizMap['cusCredTyp-2021']; break;
            default: txt = '';
          }
          return <span title={txt} >{txt}</span>;
        },
      },
      { title: bizMap.cusCredNo, dataIndex: 'cusCredNo', width: 200 },
      { title: bizMap.cmuTel, dataIndex: 'cmuTel' },

      {
        title: commonMap.action, fixed: 'right', width: 180, render(text, record) {
          return (
            <span>
              <a onClick={() => { handleDetailClick(record); }}>{commonMap.detail}</a>
            </span>
          );
        },
      },

    ],
    scroll: { x: 1300 },
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

CusInfPageTable.propTypes = {
  tableCurrentPage: PropTypes.number,
  tableList: PropTypes.array,
  tableTotal: PropTypes.number,
  tableLoading: PropTypes.bool,
  tablePageChange: PropTypes.func,
  tableRowSelect: PropTypes.func,
  handleDetailClick: PropTypes.func,
};

CusInfPageTable.defaultProps = {
  tableCurrentPage: 1,
  tableList: [],
  tableTotal: 0,
  tableLoading: false,
  tablePageChange: noop,
  tableRowSelect: noop,
  handleDetailClick: noop,
  handleUpdateClick: noop,
  handleUpdateBaseClick: noop,
  handleUpdateBankClick: noop,
  handleQueryAttachClick: noop,
}

export default CusInfPageTable;
